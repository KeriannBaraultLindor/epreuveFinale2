const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON

app.get('/tableau', function (req, res) {
   fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
   	   if (err) return console.log(err)

   	   provinces = JSON.parse(data);
       res.render('index.ejs', {data});
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})