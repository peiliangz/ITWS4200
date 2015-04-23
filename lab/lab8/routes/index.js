var express = require('express');
var router = express.Router();

var SparqlClient=require('sparql-client');
var util=require('util');
var endpoint='http://dbpedia.org/sparql';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lab 8' });
});

router.post('/sparql',function(req,res,next){
  var query=req.body.query;

  var client=new SparqlClient(endpoint);
  console.log("query",query);
  client.query(query).execute(function(error,results){
    console.log("!!!!!!!");
    //Send the result of the query back to the client
    console.log(results);
    res.send(results.results.bindings);
    console.log("!!!!!!!!");
  });

});

module.exports = router;
