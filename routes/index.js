var express = require('express');
var router = express.Router();
var conf = require('../conf.js');
var endpoints = require('../endpoints.js');
var unirest = require('unirest');


router.filtros = {
		'rating':{
			genre:'ALL',
			genero:'MEJOR PUNTUADAS',
			sort: 'rating'
		},
		'dateadded':{
			genre:'ALL',
			genero:'RECIENTEMENTE AGREGADAS',
			sort: 'date_added'
		},
		'year':{
			genre:'ALL',
			genero:'ESTE AÑO',
			sort: 'year'
		},
		'horror':{
			genre:'horror',
			genero:'TERROR',
			sort: 'like_count'
		},
		'news':{
			genre:'news',
			genero:'NOTICIAS',
			sort: 'like_count'
		},
		'sci-fi':{
			genre:'sci-fi',
			genero:'CIENCIA FICCIÓN',
			sort: 'like_count'
		},
		'action':{
			genre:'action',
			genero:'ACCIÓN',
			sort: 'like_count'
		},
		'animation':{
			genre:'animation',
			genero:'ANIMACIÓN',
			sort: 'like_count'
		},
		'adventure':{
			genre:'adventure',
			genero:'AVENTURA',
			sort: 'like_count'
		},
		'mystery':{
			genre:'mystery',
			genero:'SUSPENSO',
			sort: 'like_count'
		},
		'documentary':{
			genre:'documentary',
			genero:'DOCUMENTAL',
			sort: 'like_count'
		},
		'drama':{
			genre:'drama',
			genero:'DRAMA',
			sort: 'like_count'
		},
		'biography':{
			genre:'biography',
			genero:'BIOGRÁFICA',
			sort: 'like_count'
		},
		'crime':{
			genre:'crime',
			genero:'CRIMEN',
			sort: 'like_count'
		},
		'war':{
			genre:'war',
			genero:'BÉLICA',
			sort: 'like_count'
		},
		'fantasy':{
			genre:'fantasy',
			genero:'FANTASÍA',
			sort: 'like_count'
		},
		'musical':{
			genre:'musical',
			genero:'MUSICAL',
			sort: 'like_count'
		},
		'music':{
			genre:'music',
			genero:'MUSICA',
			sort: 'like_count'
		},
		'history':{
			genre:'history',
			genero:'REAL',
			sort: 'like_count'
		},
		'reality-tv':{
			genre:'reality-tv',
			genero:'REALITY SHOW',
			sort: 'like_count'
		},
		'talk-show':{
			genre:'talk-show',
			genero:'TALK SHOW',
			sort: 'like_count'
		},
		'family':{
			genre:'family',
			genero:'FAMILIAR',
			sort: 'like_count'
		},
		'sport':{
			genre:'sport',
			genero:'DEPORTE',
			sort: 'like_count'
		},
		'thriller':{
			genre:'thriller',
			genero:'THRILLER',
			sort: 'like_count'
		},
		'romance':{
			genre:'romance',
			genero:'ROMANCE',
			sort: 'like_count'
		},
		'game-show':{
			genre:'game-show',
			genero:'GAME SHOW',
			sort: 'like_count'
		},
		'western':{
			genre:'western',
			genero:'WESTERN',
			sort: 'like_count'
		},
		'comedy':{
			genre:'comedy',
			genero:'COMEDIA',
			sort: 'like_count'
		},
		'film-noir':{
			genre:'film-noir',
			genero:'CINE NEGRO',
			sort: 'like_count'
		}
	};


router.getMovieList = function(genre, genero, sort, set, query, callback){
		var generos = {};
		if (query != '') {
			var url = endpoints.listMoviesyts+"?genre="+genre+"&limit=50&query_term="+query+"&order_by=desc&quality=ALL&page="+set+"&sort_by="+sort;
		}else{
			var url = endpoints.listMoviesyts+"?genre="+genre+"&limit=50&order_by=desc&quality=ALL&page="+set+"&sort_by="+sort;
		}
		unirest.get(url)
			.end(function (result) {
				generos = result.body.data.movies;
				generos.nombre = genero;
				generos.pagsig = set + 1;
				if ((callback) && (typeof callback === 'function')){
		        	callback(generos);
		    	}				
			});			
	}

router.get('/', function(req, res) {
	if (req.param('pag')) {
		var pagi = req.param('pag');
	}else{
		var pagi = 1
	}
	router.getMovieList('ALL', 'POPULARES', 'like_count', pagi, '', function(generos){
		if (generos[0]) {
			var imgbg = generos[0].medium_cover_image;
			res.render('index', { active: 'peliculas', gen:generos, bg: imgbg, titulo: 'TUFILMOTECA | peliculas torrent hd, full hd, 3d', descripcion: 'Descarga de peliculas torrent', genres: router.filtros });			
		}else{
			res.render('notfound', {message: '', bg: '/img/poster_large.jpg'});
		}
	});
});


router.get('/imdbcode/:code/:name', function(req, res) {
	if (req.param('pag')) {
		var pagi = req.param('pag');
	}else{
		var pagi = 1
	}
	var code = req.params.code;
	var name = req.params.name.replace("-", " ").toUpperCase();
	router.getMovieList('ALL', name, 'like_count', pagi, code, function(generos){
		if (generos[0]) {
			var imgbg = generos[0].medium_cover_image;
			res.render('index', { active: 'peliculas', gen:generos, bg: imgbg, titulo: 'TUFILMOTECA | peliculas torrent hd, full hd, 3d', descripcion: 'Descarga de peliculas torrent', genres: router.filtros });			
		}else{
			res.render('notfound', {message: '', bg: '/img/poster_large.jpg'});
		}
	});
});


router.get('/filter/:id', function(req, res) {
	if (req.param('pag')) {
		var pagi = req.param('pag');
	}else{
		var pagi = 1
	}

	var id = req.params.id;
	router.getMovieList(router.filtros[id].genre, router.filtros[id].genero, router.filtros[id].sort, pagi, '', function(generos){
		if (generos[0]) {
			var imgbg = generos[0].medium_cover_image;			
			res.render('index', { active: 'filtro', gen:generos, bg: imgbg, titulo: 'TUFILMOTECA | '+router.filtros[id].genero, descripcion: 'Descarga de peliculas torrent', genres: router.filtros });
		}else{
			res.render('notfound', {message: '', bg: '/img/poster_large.jpg'});
		}
	});
});

router.get('/pelicula/:id/:slug', function(req, res) {
	unirest.get(endpoints.movieDetailsyts+"?movie_id="+req.params.id+"&with_images=true&with_cast=true")
		.end(function (result) {
			if (result.body.data && result.body.data.slug == req.params.slug) {
				unirest.get(endpoints.movieDetailsTmdb+result.body.data.imdb_code+'?api_key='+conf.tmdbApiKey+'&language=es')
					.end(function (tmdbData){	
						if (tmdbData.body) {
							result.body.data.tmdb = tmdbData.body;
						};					
		  				var imgbg = result.body.data.images.background_image;
		  				res.render('pelicula', { res: result.body.data, active: 'peliculas',bg: imgbg, titulo: result.body.data.title, descripcion: result.body.data.description_intro, genres: router.filtros });
					});
			}else{
				res.render('notfound', {message: 'Título no encontrado', bg: '/img/poster_large.jpg'});
			}
	});
});


router.post('/buscar', function(req, res) {
	var palabra = req.body.buscar;
	unirest.get(endpoints.listMoviesyts+"?genre=all&query_term="+palabra+"&limit=50&order_by=desc&quality=ALL&&sort_by=like_count")
		.end(function (result) {
			cantidad = result.body.data.movie_count;
			if (cantidad > 0) {
		  		var imgbg = result.body.data.movies[0].medium_cover_image;
		  		estado = 'resultados'
			}else{
				var imgbg = '/img/poster_large.jpg';
				estado = 'ninguno'
			}
		  res.render('buscar', { res: result.body.data.movies, bg:imgbg, status: estado, titulo: 'TUFILMOTECA | Buscar: '+palabra, descripcion: 'Descarga de peliculas torrent', word:palabra, genres: router.filtros });
	});
});

router.get('/help', function(req, res) {
	res.render('help', {bg: '/img/poster_large.jpg', active: 'help'});
});

router.get('/mylist', function(req, res) {
	res.render('mylist', {bg: '/img/poster_large.jpg', active: 'mylist'});
});

router.get('/list', function(req, res) {
	var element = req.param('element');
	unirest.get(endpoints.movieDetailsyts+"?movie_id="+element+"&with_images=true")
		.end(function (result) {
			if (result.body.data) {
		  		res.render('list', {rec: result.body.data, genres: router.filtros});
			}
	});
});
module.exports = router;
