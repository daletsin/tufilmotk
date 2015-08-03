var express = require('express');
var router = express.Router();
var conf = require('../conf.js');
var unirest = require('unirest');




router.obtenerdatos = function(genre, genero, sort, set, callback){
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
	router.obtenerdatos('ALL', 'POPULARES', 'like_count', pagi, function(generos){
		var imgbg = generos[0].medium_cover_image;
		res.render('index', { active: 'peliculas', gen:generos, bg: imgbg, titulo: 'TUFILMOTECA | peliculas torrent hd, full hd, 3d', descripcion: 'Descarga de peliculas torrent' });
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
			genero:'RECIEN SUBIDAS',
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
	router.obtenerdatos(filtros[id].genre, filtros[id].genero, filtros[id].sort, pagi, function(generos){
		var imgbg = generos[0].medium_cover_image;
		res.render('index', { active: 'filtro', gen:generos, bg: imgbg, titulo: 'TUFILMOTECA | '+filtros[id].genero, descripcion: 'Descarga de peliculas torrent' });
	});
});

router.get('/pelicula/:id', function(req, res) {
	unirest.get("https://yts.to/api/v2/movie_details.json?movie_id="+req.params.id+"&with_images=true&with_cast=true")
		.end(function (result) {
		console.log(result.body.data);
		  var imgbg = result.body.data.images.background_image;
		  res.render('pelicula', { res: result.body.data, bg: imgbg, titulo: result.body.data.title, descripcion: result.body.data.description_intro });
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


/*
router.get('/test', function(req, res) {
	unirest.get("https://yifytorrents.p.mashape.com/list.json?genre=ALL&limit=50&order=desc&quality=ALL&rating=0&set=1&sort=like_count")
		.header("X-Mashape-Key", conf.mashape_key)
		.end(function (result) {			
		  res.render('test', { res: result.body});
	});
});

*/
module.exports = router;
