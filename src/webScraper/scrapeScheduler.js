/////////////////////////////////////////////
// Uverse Ratings Server
/////////////////////////////////////////////

var http = require('http');
var request = require('request');
var fs = require("fs");
var express = require("express");
var app = express();
var schedule = require('node-schedule');
var PythonShell = require('python-shell');


var rule = new schedule.RecurrenceRule();
rule.minute = 15;



var options = {
  mode: 'text',
  pythonPath: '../../venv/bin/python3',
};

var j = schedule.scheduleJob(rule, function(){
  PythonShell.run('scraper.py', options, function (err, results) {
    if (err) throw err;
    console.log('Scraper Ran');
  });
});







/////////////////////////////////////////////
// Route Definition
/////////////////////////////////////////////
// app.all('/', function crossOrigin(req,res,next){
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Access-Control-Allow-Credentials', 'false');
//     return next();
// });
// //server.use(restify.bodyParser ({mapParams: false, multiples: true}));
//
//
// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
//
//    console.log("Example app listening at http://%s:%s", host, port)
// });
