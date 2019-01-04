const express = require('express');

//assign variable
const app = express();

//routes
app.get('/', function(req, res){
  res.send('Hello world');
});

app.listen(3000, function() {
  console.log('Server started on port 3000.');
});
