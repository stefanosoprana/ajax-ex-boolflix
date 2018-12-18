$(document).ready(function(){

  $('button').click(function(){
    var input = $('input').val()

    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      data: {
        api_key: '34da49db03cff40a92cb2b8f356c68fe',
        language: 'it',
        query: input
      },
      method: 'GET',
      success: function(data){
        $('.movie').html('')
        var raccoltaFilm = data.results;
        // console.log(raccoltaFilm);
        for (var i = 0; i < raccoltaFilm.length; i++) {
          var film = raccoltaFilm[i];

          var voto_film = film.vote_average;

          var arrotondamento = Math.ceil(voto_film / 2);

          var source   = $('#movie-template').html()
          var template = Handlebars.compile(source);

          var context = {
            title: film.title,
            original_title: film.original_title,
            language: film.original_language,
            rating: starRate(arrotondamento),
          };
          var html = template(context);

          $('.movie').append(html)
        }
      },
      error: function(){
        alert('si è verificato un errore')
      }
    });
  });

  function starRate(counter){

    var star = '';

    var diff = 5 - counter;

    for (var i = 0; i < counter; i++) {

      star += '<i class="fas fa-star"></i>';

    };

    for (var i = 0; i < diff; i++) {

      star += '<i class="far fa-star"></i>';

    };

    return star
  };

});
