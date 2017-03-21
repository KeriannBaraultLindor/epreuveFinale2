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

var db // variable qui contiendra le lien sur la BD

//127.0.0.1 est équivalent à localhost
MongoClient.connect('mongodb://127.0.0.1:27017/carnet-adresse', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')//confirmation de la connexion réussie
  })
})

app.get('/fichier', function (req, res) {
   fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
       console.log( data );
       res.end(data);
   });
})

app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
 
    var cursor = db.collection('provinces').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {provinces: resultat})//récupère les données du ul provinces

    })
})

//permet d'enregistrer les données entrées dans la base de données
app.post('/provinces',  (req, res) => {
  db.collection('provinces').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('sauvegarder dans la BD')
      res.redirect('/')
    })
})