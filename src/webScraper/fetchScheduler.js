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
rule.minute = 15;

var j = schedule.scheduleJob(rule, function(){

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

function generateList(){
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
}










generateList();
