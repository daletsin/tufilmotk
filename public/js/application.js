/*var crearslick = function(){


  $('.grilla').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    variableWidth: true,
    centerPadding:0
  });

}*/


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
}, function(){
      //var scrollTo = $(window).scrollTop();
     // $('html,body').animate({ scrollTop: scrollTo }, 800, function () {});
  });


/*
$('.grilla').jscroll({
    loadingHtml: '<img src="/img/ajax-loader.gif" alt="Loading" /> Loading...',
    padding: 20,
    nextSelector: 'a.navigation',
    //contentSelector: '.grilla .content-scroll'
});
  */



var agregarlista = function(id, ob){
  	var item = localStorage.getItem('k'+id);
  	if (!item) {
  		localStorage.setItem('k'+id, ob);
  	};

  	console.log(item[0]);
  }

var filter = function(id, last){
  $.get('/filter/'+id, function(data){
    $('.more').remove();
    $('.masthead').append(data);
    //crearslick();
  })
}


/*
$.ajaxSetup({
    beforeSend: function(xhr, status) {
        // TODO: show spinner
        $('.more').addClass('invisible');
        $('.docs-loading-spinner').removeClass('invisible');
    },
    complete: function() {
        // TODO: hide spinner
        $('.more').removeClass('invisible');
        $('.docs-loading-spinner').addClass('invisible');
    }
});
*/
//crearslick();