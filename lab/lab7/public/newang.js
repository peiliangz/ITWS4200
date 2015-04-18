var app=angular.module('myApp',[]);

//for the first button
  app.controller('saveName', function($scope,$http){
    //$scope.myStyle={text-align:'center'};
    $scope.filename='mycsvfile';
    $scope.response={};
    console.log("save the file name");
    console.log($scope.filename);
    //once you click the save button, the name of the file will be sent to the sever using $http.
    $scope.save=function(){
      var posting = $http({
          method: 'POST',
          /*posting to /post */
          url: '/post',
          data: {filename: $scope.filename},
          processData: false
      })
      posting.success(function (response) {
          /*executed when server responds back*/
          console.log(response);
      });
      $scope.notice='You have chose '+$scope.filename+' as the name of the file !';
    };
  });

//for the second button
  app.controller('convertFile',function($scope,$http){
    $scope.convert=function(){

      function JSON2CSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var line = '';
        var head = array[0];
        for (var index in array[0]) {
          var value = index + "";
          line += '"' + value.replace(/"/g, '""') + '",';
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
              var value = array[i][index] + "";
              line += '"' + value.replace(/"/g, '""') + '",';
            }
            line = line.slice(0, -1);
            str += line + '\r\n';
          }
          return str;
        }
        var getting=$http({
          method:'GET',
          url:'/get'

          })
          getting.success(function(response){
            console.log(response);
            var csv=JSON2CSV(response);
            $scope.csvfile=csv;
          });
   }
  });


  //for the third button
  app.controller('buildMongoDB',function($scope,$http){
  //  $scope.keyword='nodejs';
  //  $scope.response={};
      $scope.build=function(){
        var posttobuild=$http({
          method:'POST',
          url:'/postbuildDB'

        })
        posttobuild.success(function(response){
               console.log(response);
        });
      }
  });


  //for the forth button, pull data from database and display to web page
  app.controller('pulldisplay',function($scope,$http){
    $scope.pullanddisplay=function(){
      //some helper function, not sure can be placed here!
      function popTweet(){
        var next_up=$("ul#tweets li:first-child");
        var next_down=$("ul#top_tweets li:first-child");
        var popped=next_down.clone();

        $("ul#tweets").append(popped);

        var new_tweet=next_up.clone();
        next_up.remove();
        next_down.fadeOut(100,function(){
          $(this).remove();
          new_tweet.appendTo("ul#top_tweets").hide().fadeIn(500);
        });
      }


      function styleTweet(tweet){
        var the_tweet="<li>";
        var the_tweet=the_tweet+'<span class="data">'+tweet.created_at+"</span>";
        var the_tweet=the_tweet+'<span class="tweet">';
        var the_tweet=the_tweet+'<span class="handle">'+tweet.user.screen_name+":</span>";
        var the_tweet=the_tweet+'<span class="text">'+tweet.content.text+"</span>";
        var the_tweet=the_tweet+"</span></li>"
        return the_tweet;
      }
      function beginshow(total){
        var tweets=[];
        for(var i=0;i<total.length;i++){
          tweets.push(total[i]);
        }
        for(var i=0;i<5;i++){
          $("ul#top_tweets").append(styleTweet(tweets[i]));
        }
        for(var i=5; i<tweets.length;i++){
          $("ul#tweets").append(styleTweet(tweets[i]));
        }

        setInterval(function(){
          popTweet();
        },3000);
      }
      var pulltodisplay=$http({
        method:'GET',
        url:'/pullanddisplay'
      })
      pulltodisplay.success(function(response){
        console.log("This is response!");
        console.log(response);
        beginshow(response);
                 //$scope.tweets=response;


      });
    }
  });

  app.controller('readconvert',function($scope,$http){
    //filename or jsonfilename both will be okay, I guess
    //'myjson' is the default name of the file
    $scope.jsonfilename='myjson';
    $scope.response={};
    console.log("save the name of the json file!");
    //show the default name of the file
    console.log($scope.jsonfilename);
    $scope.save2json=function(){
      var posting=$http({
        method:'POST',
        url:'/savejsonname',
        data:{ jsonfilename: $scope.jsonfilename},
        processData:false
      })
      posting.success(function(response){
        console.log(response);
      });

      $scope.notice='You have chose '+$scope.jsonfilename+' as the name of the file !';
    };


  });
