$(document).ready(function(){

  $('button').click(function(){
    var input = $('input').val()

    $('.movie').html('')

    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      data: {
        api_key: '34da49db03cff40a92cb2b8f356c68fe',
        language: 'it',
        query: input
      },
      method: 'GET',
      success: function(data){
        var raccoltaFilm = data.results;
        console.log(raccoltaFilm);
        for (var i = 0; i < raccoltaFilm.length; i++) {

          var film = raccoltaFilm[i];

          var source = $('#movie-template').html()
          var template = Handlebars.compile(source);

          var context = {
            title: film.title,
            original_title: film.original_title,
            language: flag(film.original_language),
            rating: starRate(film.vote_average),
          };
          var html = template(context);

          $('.movie').append(html)

          // var titolo = film.title;
          // console.log(titolo);
          // var titolo_originale = film.original_title;
          // console.log(titolo_originale);
          //
          // doubleTitle(titolo, titolo_originale);

        }
      },
      error: function(){
        alert('si è verificato un errore')
      }
    });

    $.ajax({
      url: 'https://api.themoviedb.org/3/search/tv',
      data: {
        api_key: '34da49db03cff40a92cb2b8f356c68fe',
        language: 'it',
        query: input
      },
      method: 'GET',
      success: function(data){
        var raccoltaTv = data.results;
        console.log(raccoltaTv);
        for (var i = 0; i < raccoltaTv.length; i++) {
          var serieTv = raccoltaTv[i];

          // doubleTitle(serieTv.name, serieTv.original_name);

          var source = $('#movie-template').html()
          var template = Handlebars.compile(source);

          var context = {
            title: serieTv.name,
            original_title: serieTv.original_name,
            language: flag(serieTv.original_language),
            rating: starRate(serieTv.vote_average),
          };
          var html = template(context);

          $('.movie').append(html)
        }
      },
      error: function(){
        alert('si è verificato un errore')
      }
    });

    $('input').val('');

  });

  // function doubleTitle(titolo,titolo_originale) {
  //   if (titolo == titolo_originale) {
  //     $('.titolo_originale').addClass('active')
  //   };
  // }

  function starRate(counter){

    var star = '';
    var numeroIntero = Math.ceil(counter / 2);
    var diff = 5 - numeroIntero;

    for (var i = 0; i < numeroIntero; i++) {
      star += '<i class="fas fa-star"></i>';
    };

    for (var i = 0; i < diff; i++) {
      star += '<i class="far fa-star"></i>';
    };

    return star
  };

  function flag(languageISO){

    if (languageISO == 'en') {
      var language = '<span class="flag-icon flag-icon-' + 'gb' + '"></span>';
    }

    else if (languageISO == 'ja') {
      var language = '<span class="flag-icon flag-icon-' + 'jp' + '"></span>';
    }

    else if (languageISO == 'hi') {
      var language = '<span class="flag-icon flag-icon-' + 'in' + '"></span>';
    }

    else if (languageISO == 'zh') {
      var language = '<span class="flag-icon flag-icon-' + 'cn' + '"></span>';
    }

    else {
      var language = '<span class="flag-icon flag-icon-' + languageISO + '"></span>';
    }

    return language

  };

});
