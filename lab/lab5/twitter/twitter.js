//var express=require('express');
var fs=require('fs');
//var request=require('request');
var express=require('express');
var app=express();
//var app=require('express')();
var http=require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');


});

app.use(express.static(__dirname));

  //var util=require('util');
  var Twitter=require('twitter');
  var client=new Twitter({
        consumer_key:'vJ3VVdNz2Koq7HDNRy8Dc07A8',
        consumer_secret:'RkgfWYJcX7dzSEMv2t4YXxFNPE6sIcwibX7gMrShfSCiqWWu2c',
        access_token_key:'3066502515-idjwC2CxBPDgdtsCiCKo3bjJJ4XS3gEaBy2XYeC',
        access_token_secret:'zJO8D1LPEQINpxZIRirsxUqt1VpMugmJdL9g6MqRUXgTD'

      });

var latestMentions=[];
var params={screen_name:'nodejs'};
client.get('statuses/user_timeline',params,function(error, tweets, response){
if(!error){
   console.log(tweets);
  console.log(tweets.length);
  for(var i=0;i<tweets.length;i++){
  var currentTweet=tweets[i];
  latestMentions.push(currentTweet);
  //console.log(latestMentions);

  }

  fs.writeFile('tweet-conventions.json',JSON.stringify(latestMentions),function(err){
      if(err) return console.log(err);
    });
}
});

http.listen(3000, function(){
  console.log('Server up on *:3000');
});
