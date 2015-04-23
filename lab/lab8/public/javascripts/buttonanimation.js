$(document).ready(function(){
  //for the save button
    $('#sendbutton').click(function(){
       $('#sendbutton').html('');
       $('#sendbutton').removeClass('submit');
       $('#sendbutton').addClass('loader');
       setTimeout(function() {
           $('#sendbutton').removeClass('loader');
           $('#sendbutton').addClass('success');
           $('#sendbutton').removeClass('submit');
           $('#sendbutton').html('^ ^');
      }, 2000);

    });

});
