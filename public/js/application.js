$('.grilla').infinitescroll({
 
    loading: {
        finished: undefined,
        finishedMsg: "<em>No hay mas títulos para mostrar</em>",
        img: "/img/ajax-loader.gif",
        msg: null,
        msgText: "<em>Cargando más títulos...</em>",
        selector: null,
        speed: 'slow',
        start: undefined
    },
    debug: true,
    nextSelector: "a.navigation",
    navSelector: ".navigation",
    itemSelector: ".grilla .content-scroll"
}, function(){});


$(document).ready(function(){
  checkadded()
});
$(document).ajaxComplete(function(){
  checkadded()
});


/*
var agregarlista = function(id, ob){
  	var item = localStorage.getItem('k'+id);
  	if (!item) {
  		localStorage.setItem('k'+id, ob);
  	};

  	console.log(item[0]);
  }
*/
var filter = function(id, last){
  $.get('/filter/'+id, function(data){
    $('.more').remove();
    $('.masthead').append(data);
  })
}

var checkadded = function(){
  if (checkLocalStorage()) {
      if (!localStorage.getItem('moviestufilmoteca')) {
        localStorage.setItem('moviestufilmoteca', '');
      };
      var movies = localStorage.getItem('moviestufilmoteca');
      moviesobject = movies.split(',');
    $(".list-add").each(function(index){
      var idmovie = $(this).attr('id').replace('list-add-','');
      if ($.inArray(idmovie, moviesobject) === -1 || !movies) {
        $(this).html('Agregar a mi lista <i class="fa fa-plus"></i>');
        $(this).removeClass('removeto-list');
        $(this).addClass('addto-list');
      }else{
        $(this).html('Borrar de mi lista <i class="fa fa-times"></i>');
        $(this).addClass('removeto-list');
        $(this).removeClass('addto-list');
      }
    });
  };
}

var addRemove = function(el){
  var idmovie = $(el).attr('id').replace('list-add-','');
  if ($(el).hasClass('removeto-list')) {
    removeToList(idmovie);
  }else if($(el).hasClass('addto-list')){
    addToList(idmovie);
  }
  console.log($(el));
}

var removeToList = function(idmovie){
  var movies = localStorage.getItem('moviestufilmoteca');
  if (movies && movies !== '') {
    moviesobject = movies.split(',');
    moviesobject.splice($.inArray(idmovie, moviesobject),1);
    localStorage.setItem('moviestufilmoteca', moviesobject.toString());
  };
  $('#list-add-'+idmovie).html('Agregar a mi lista <i class="fa fa-plus"></i>');
  $('#list-add-'+idmovie).removeClass('removeto-list');
  $('#list-add-'+idmovie).addClass('addto-list');  
}

var addToList = function(idmovie){
  var movies = localStorage.getItem('moviestufilmoteca');
  if (!movies || movies == '') {
    localStorage.setItem('moviestufilmoteca', idmovie);
  }else if(movies && movies !== ''){
    movies+= ','+idmovie;
    localStorage.setItem('moviestufilmoteca', movies);
  }else if(movies === ''){
    movies+=idmovie;
    localStorage.setItem('moviestufilmoteca', movies);
  }
  $('#list-add-'+idmovie).html('Borrar de mi lista <i class="fa fa-times"></i>');
  $('#list-add-'+idmovie).addClass('removeto-list');
  $('#list-add-'+idmovie).removeClass('addto-list');

}

var checkLocalStorage = function(){
  if('localStorage' in window && window['localStorage'] !== null) {
    return true;
  } else { 
    return false;
  }
}
