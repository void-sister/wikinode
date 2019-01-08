const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//connect to db
mongoose.connect('mongodb://localhost/wikikb', {useNewUrlParser:true});
let db = mongoose.connection;

//check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

//check for db errors
db.on('error', function(err){
  console.log(err);
});

//init app
const app = express();

//bring in models
let Article = require('./models/article');

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//BODY PARSER MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//home route
app.get('/', function(req, res){
  // res.send('Hello world');

  Article.find({}, function(err, articles){
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        articles: articles
      });
    }
  });
});

//get single article
app.get('/article/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    res.render('article', {
      article:article
    });
  });
});

//add route
app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title:'Add Article'
  });
});

//add submit POST route
app.post('/articles/add', function(req, res){
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function(err){
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/');
  });
});

//start server
app.listen(3000, function() {
  console.log('Server started on port 3000.');
});
