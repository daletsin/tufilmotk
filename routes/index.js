var express = require('express');
var router = express.Router();
var conf = require('../conf.js');
var unirest = require('unirest');




router.getMovieData = function(genre, genero, sort, set, callback){
		var generos = {};
		var url = "https://yts.to/api/v2/list_movies.json?genre="+genre+"&limit=50&order_by=desc&quality=ALL&page="+set+"&sort_by="+sort;
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
	router.getMovieData('ALL', 'POPULARES', 'like_count', pagi, function(generos){
		if (generos[0]) {
			var imgbg = generos[0].medium_cover_image;
			res.render('index', { active: 'peliculas', gen:generos, bg: imgbg, titulo: 'TUFILMOTECA | peliculas torrent hd, full hd, 3d', descripcion: 'Descarga de peliculas torrent' });			
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
	var filtros = [
		{
			genre:'ALL',
			genero:'MEJOR PUNTUADAS',
			sort: 'rating'
		},
		{
			genre:'ALL',
			genero:'RECIENTEMENTE AGREGADAS',
			sort: 'date_added'
		},
		{
			genre:'ALL',
			genero:'ESTE AÑO',
			sort: 'year'
		},
		{
			genre:'horror',
			genero:'TERROR',
			sort: 'like_count'
		},
		{
			genre:'sci-fi',
			genero:'CIENCIA FICCIÓN',
			sort: 'like_count'
		},
		{
			genre:'action',
			genero:'ACCIÓN',
			sort: 'like_count'
		},
		{
			genre:'animation',
			genero:'ANIMACIÓN',
			sort: 'like_count'
		},
		{
			genre:'adventure',
			genero:'AVENTURA',
			sort: 'like_count'
		},
		{
			genre:'mystery',
			genero:'SUSPENSO',
			sort: 'like_count'
		},
		{
			genre:'documentary',
			genero:'DOCUMENTAL',
			sort: 'like_count'
		},
		{
			genre:'drama',
			genero:'DRAMA',
			sort: 'like_count'
		},
		{
			genre:'biography',
			genero:'BIOGRÁFICA',
			sort: 'like_count'
		},
		{
			genre:'war',
			genero:'BÉLICA',
			sort: 'like_count'
		},
		{
			genre:'fantasy',
			genero:'FANTASÍA',
			sort: 'like_count'
		},
		{
			genre:'musical',
			genero:'MUSICAL',
			sort: 'like_count'
		},
		{
			genre:'history',
			genero:'REAL',
			sort: 'like_count'
		},
		{
			genre:'family',
			genero:'FAMILIAR',
			sort: 'like_count'
		},
		{
			genre:'sport',
			genero:'DEPORTE',
			sort: 'like_count'
		},
		{
			genre:'thriller',
			genero:'THRILLER',
			sort: 'like_count'
		},
		{
			genre:'romance',
			genero:'ROMANCE',
			sort: 'like_count'
		},
		{
			genre:'western',
			genero:'WESTERN',
			sort: 'like_count'
		}
	];
	router.getMovieData(filtros[id].genre, filtros[id].genero, filtros[id].sort, pagi, function(generos){
		if (generos[0]) {
			var imgbg = generos[0].medium_cover_image;			
			res.render('index', { active: 'filtro', gen:generos, bg: imgbg, titulo: 'TUFILMOTECA | '+filtros[id].genero, descripcion: 'Descarga de peliculas torrent' });
		}else{
			res.render('notfound', {message: '', bg: '/img/poster_large.jpg'});
		}
	});
});

router.get('/pelicula/:id', function(req, res) {
	unirest.get("https://yts.to/api/v2/movie_details.json?movie_id="+req.params.id+"&with_images=true&with_cast=true")
		.end(function (result) {
			if (result.body.data) {
		  		var imgbg = result.body.data.images.background_image;
		  		res.render('pelicula', { res: result.body.data, bg: imgbg, titulo: result.body.data.title, descripcion: result.body.data.description_intro });
			}else{
				res.render('notfound', {message: 'Título no encontrado', bg: '/img/poster_large.jpg'});
			}
	});
});


router.post('/buscar', function(req, res) {
	var palabra = req.body.buscar;
	unirest.get("https://yts.to/api/v2/list_movies.json?genre=all&query_term="+palabra+"&limit=50&order_by=desc&quality=ALL&&sort_by=like_count")
		.end(function (result) {
			cantidad = result.body.data.movie_count;
			if (cantidad > 0) {
		  		var imgbg = result.body.data.movies[0].medium_cover_image;
		  		estado = 'resultados'
			}else{
				var imgbg = '/img/poster_large.jpg';
				estado = 'ninguno'
			}
		  res.render('buscar', { res: result.body.data.movies, bg:imgbg, status: estado, titulo: 'TUFILMOTECA | Buscar: '+palabra, descripcion: 'Descarga de peliculas torrent', word:palabra });
	});
});

router.get('/mylist', function(req, res) {
	res.render('mylist', {bg: '/img/poster_large.jpg', active: 'mylist'});
});

router.get('/list', function(req, res) {
	var element = req.param('element');
	unirest.get("https://yts.to/api/v2/movie_details.json?movie_id="+element+"&with_images=true")
		.end(function (result) {
			if (result.body.data) {
		  		res.render('list', {rec: result.body.data});
			}
	});
});
module.exports = router;
