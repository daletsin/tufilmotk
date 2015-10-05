Tufilmoteca.tk
==============

PAGINA DE DESCARGA DE PELICULAS POR TORRENT- node js, yify api, tmdb api [Tufilmoteca.tk](http://tufilmoteca.tk).

Instalación
------------

1. Instalar nodejs y npm.
2. Descargar o clonar este proyecto.
3. Ingresar al directorio descargado y ejecutar:

> npm install

4. Registrarse en [Tmdb](https://www.themoviedb.org) y obtener una key.
5. Crear en la raiz un archivo conf.js y completar la variable tmdbApiKey con la key obtenida en el punto 4.

>var conf = {tmdbApiKey: 'mykey'};
>module.exports = conf;

6. ejecutar 

>node bin/www
