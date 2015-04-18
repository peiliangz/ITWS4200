$(document).ready(function(){
  //for the save button
    $('#savebutton').click(function(){
       $('#savebutton').html('');
       $('#savebutton').removeClass('submit');
       $('#savebutton').addClass('loader');
       setTimeout(function() {
           $('#savebutton').removeClass('loader');
           $('#savebutton').addClass('success');
           $('#savebutton').removeClass('submit');
           $('#savebutton').html('Done!');
      }, 2000);

    });

    //for the convert button
    $('#convertbutton').click(function(){
       $('#convertbutton').html('');
       $('#convertbutton').removeClass('submit');
       $('#convertbutton').addClass('loader');
       setTimeout(function() {
           $('#convertbutton').removeClass('loader');
           $('#convertbutton').addClass('success');
           $('#convertbutton').removeClass('submit');
           $('#convertbutton').html('Done!');
      }, 2000);

    });

    $('#buildbutton').click(function(){
       $('#buildbutton').html('');
       $('#buildbutton').removeClass('submit');
       $('#buildbutton').addClass('loader');
       setTimeout(function() {
           $('#buildbutton').removeClass('loader');
           $('#buildbutton').addClass('success');
           $('#buildbutton').removeClass('submit');
         $('#buildbutton').html('Done!');
      }, 2000);

    });

    $('#pullanddisplaybutton').click(function(){
       $('#pullanddisplaybutton').html('');
       $('#pullanddisplaybutton').removeClass('submit');
       $('#pullanddisplaybutton').addClass('loader');
       setTimeout(function() {
           $('#pullanddisplaybutton').removeClass('loader');
           $('#pullanddisplaybutton').addClass('success');
           $('#pullanddisplaybutton').removeClass('submit');
           $('#pullanddisplaybutton').html('display');
      }, 2000);

    });

    $('#savejson').click(function(){
       $('#savejson').html('');
       $('#savejson').removeClass('submit');
       $('#savejson').addClass('loader');
       setTimeout(function() {
           $('#savejson').removeClass('loader');
           $('#savejson').addClass('success');
           $('#savejson').removeClass('submit');
           //$('#savejson').html('success!');
          $('#savejson').html('save2json');
      }, 2000);



    });


});
