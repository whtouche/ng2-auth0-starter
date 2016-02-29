var express = require('express');
var jwt = require('express-jwt');
var cors = require('cors');
var quotes = require('./quotes.json');
var auth0Settings = require('./auth0.json');
var app = express();
var mongoose = require('mongoose'); //
var bodyParser = require('body-parser'); //

mongoose.connect('mongodb://localhost/todos'); //

var jwtCheck = jwt({
  secret: new Buffer(auth0Settings.secret, 'base64'),
  audience: auth0Settings.audience
});

// Middleware
app.use(cors());
app.use('/api/quote', jwtCheck);
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({
    extended: true
})); //

var cats = require('./routes/todo.js')(app); //

app.get('/api/quote', function (req, res) {
  var rand = Math.ceil(Math.random() * quotes.length);
  res.json(quotes[rand]);
});

app.listen(3002, function () {
  console.log('Backend listening on port 3002!');
});