var express = require('express');
var app = express();

//static file
app.use(express.static(__dirname));
var route = require('./routes/route')(app);
