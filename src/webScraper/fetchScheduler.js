/////////////////////////////////////////////
// Uverse Ratings Server
/////////////////////////////////////////////

var http = require('http');
var request = require('request');
var fs = require("fs");
var express = require("express");
var app = express();
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 30;

var j = schedule.scheduleJob(rule, function(){
  generateList(function(){
    downloadPictures();
  });
});

function getInfo(title, callback){
  var propertiesObject = { t:title};
  request({url:"http://www.omdbapi.com", qs:propertiesObject}, function(err, response, body) {
    if(err) { console.log(err); return; }
    callback(response.body);
  });
}

function fetch(titles, start, end, results, callback){
  if(start==end){
    console.log("Function Finished");
    return callback(results);
  }

  console.log("Getting Info For " + titles[start]['title']);

  getInfo(titles[start]['title'], function(res){
    //console.log(res);
    results.push(JSON.parse(res));
    //onsole.log(results);
    fetch(titles, start+1, titles.length, results, callback);
  });
}

function generateList(callback){
  var list = []
  fs.readdir("../scraped", function(err, items) {
      console.log(items);

      for (var i=0; i<items.length; i++) { //Each file in the directory
        fs.readFile('../scraped/' + items[i], 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          var json = JSON.parse(data); //We now have the file contents
          //console.log(json['movies']);
          var res = fetch(json['movies'],0,json['movies'].length,[], function(res){ //get array of movie info
            console.log(res);
            var obj = {"Category":json['category'], "Movies":res};
            fs.writeFile('../data/' + json['category'] + '.json', JSON.stringify(obj), function (err) { //write the shit to a file
              if (err) return console.log(err);
              console.log('File Saved');
            });
          });
          //console.log("Fetch Completed");


        });
      }
  });

  return callback();
}

function download(url, callback){
  var filename = url.substring(url.lastIndexOf('/')+1);
  request.head(url, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(url).pipe(fs.createWriteStream("../posters/" + filename)).on('close', callback);
  });
};


function downloadPictures(){
  fs.readFile('../data/All.json', 'utf8', function (err,data) {
    var json = JSON.parse(data);
    var movies = json.Movies
    console.log(movies);
    for(var i = 0; i<movies.length; i++){
      if(movies[i].Poster != "N/A" && (movies[i].Poster != undefined)){
        download(movies[i].Poster, function(){

        });
      }
    }
  });
}
