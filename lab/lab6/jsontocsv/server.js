var json2csv = require('json2csv');
var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);
io=io.listen()
var jf=require('jsonfile');
var fs=require('fs');
var file=__dirname+'/tweet-conventions.json';

var obj=jf.readFileSync(file);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

});

app.use(express.static(__dirname));

io.on('connection',function(socket){
  socket.on('chat message',function(msg){
    console.log('message:'+msg);
  });
  console.log('a user connected');
  socket.on('disconnect',function(){
    console.log('user disconnected');
  });
});
var csvFile;

  json2csv({data:obj, fields:['created_at','id','text','user_id','user_name',
  'user_screen_name','user_location','user_followers_count','user_friends_count','user_created_at','user_time_zone',
  'user_profile_background_color','user_profile_image_url','geo','coordinates','place']},
  function(err,csv){
    if(err) console.log(err);
    fs.writeFile(csvFile+'.csv',csv,function(err){
      if(err) throw err;
      console.log('file saved');
    });
  });


  http.listen(3000, function(){
    console.log('Server up on *:3000');
  });
