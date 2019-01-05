const express = require('express');
const path = require('path');

//init app
const app = express();

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//home route
app.get('/', function(req, res){
  // res.send('Hello world');
  res.render('index', {
    title:'Articles'
  });
});

//add route
app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title:'Add Article'
  });
});

//start server
app.listen(3000, function() {
  console.log('Server started on port 3000.');
});
