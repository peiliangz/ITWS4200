var fs=require('fs');
var express = require('express');
var path = require('path');
var bodyParser=require('body-parser');
var json2csv = require('json2csv');
//var logger=require('morgan');
//var compression=require('compression');
var app = express();

var http = require('http').Server(app);

app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

var jf=require('jsonfile');
var file=__dirname+'/tweet-conventions.json';
var obj=jf.readFileSync(file);
var filename;
var jsonfilename;
//var keyword;

var DB_NAME = 'mydb';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/'+DB_NAME);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
console.log('connection success');
});

var Schema   = mongoose.Schema;

var TwitterSchema = new Schema({
  content:  {
      text: String,
      url: String,
      image: String,
      location: {
          lat: String,
          lon: String
      }
  },
  user: {
      twitter_id: String,
      name: String,
      screen_name: String,
      description: String,
      images: String,
      location: {
          lat: String,
          lon: String
      }
  },
  create_at: { type: Date, default: Date.now }
});

mongoose.model('TwModel', TwitterSchema);

var TwModel = mongoose.model('TwModel');



/*to access the posted data from client using request body*/

app.post('/post', function (req, res) {
    /* Handling the AngularJS post request*/
    filename=req.body.filename;

    json2csv({data:obj, fields:['created_at','id','text','user_id','user_name',
    'user_screen_name','user_location','user_followers_count','user_friends_count','user_created_at','user_time_zone',
    'user_profile_background_color','user_profile_image_url','geo','coordinates','place']},
    function(err,csv){
      if(err) console.log(err);
      fs.writeFile(filename+'.csv',csv,function(err){
        if(err) throw err;
        console.log('file saved');
      });
    });

    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    /*response has to be in the form of a JSON*/
    req.body.serverMessage = "NodeJS replying to angular"
        /*adding a new field to send it to the angular Client */
    res.send(JSON.stringify(req.body));
    /*Sending the respone back to the angular Client */
});

app.get('/get',function(req,res){
  console.log(req.body);
    req.body=obj;
    console.log("finish!");
  //res.setHeader('Content-Type','appliation/json');
    res.send(req.body);
  /*res.set('Content-Type','application/octet-stream');*/
});


//here we declare the mongoDB module
app.post('/postbuildDB',function(req,res){

/*twitter設定*/
var twitter = require('twitter');

var twit = new twitter({
consumer_key: 'vJ3VVdNz2Koq7HDNRy8Dc07A8',
consumer_secret: 'RkgfWYJcX7dzSEMv2t4YXxFNPE6sIcwibX7gMrShfSCiqWWu2c',
access_token_key: '3066502515-idjwC2CxBPDgdtsCiCKo3bjJJ4XS3gEaBy2XYeC',
access_token_secret: 'zJO8D1LPEQINpxZIRirsxUqt1VpMugmJdL9g6MqRUXgTD'
});

/**/

//var TwModel = mongoose.model('TwModel');
//var keyword = req.body.keyword;
var keyword ='demi';
//keyword= process.argv[2]; //第一引数
var option = {'track': keyword};

console.log(keyword+'is the keyword!');

twit.stream('statuses/filter', option, function(stream) {
  stream.on('data', function (data){
    //console.log('hello!');
      if(data.lang === 'en'){

          var twmodel = new TwModel();
          twmodel.content = {
              text: data.text
          };

          twmodel.user = {
              screen_name: data.user.screen_name
          };

          twmodel.save(function (err, data) {
            if (err) return console.error(err);
            console.log(data);
            //console.log('!!!!!!');
          });

      }
});
});

 //**************************************//
 //read data from the database//
 /*
 TwModel.find(function(err,data){
   if(err) return console.error(err);
   console.log("pull data from db!!")

  console.log(data);
 });

 */
 //****************************************//
});

var tweets=[];
app.get('/pullanddisplay',function(req,res){
  TwModel.find(function(err,data){
    if(err) return console.error(err);
    console.log("pull data from db!!")
    for(var i=0; i<data.length;i++){
      tweets.push(data[i]);
    }
   //console.log(tweets);
   //console.log(tweets.length);
   console.log("req body!");
   //console.log(req.body);
   req.body=tweets;
   console.log(req.body);
   res.send(req.body);
  });


});

app.post('/savejsonname',function(req,res){
  jsonfilename=req.body.jsonfilename;
  fs.writeFile(jsonfilename+'.json',JSON.stringify(tweets),function(err){
      if(err) return console.log(err);
    });

    res.setHeader('Content-Type', 'application/json');
    /*response has to be in the form of a JSON*/
    req.body.serverMessage = "NodeJS replying to angular"
        /*adding a new field to send it to the angular Client */
    res.send(JSON.stringify(req.body));
});


http.listen(3000, function(){
  console.log('Server up on *:3000');
});
