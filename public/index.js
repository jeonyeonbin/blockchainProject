var express = require('express');
var app = express();
var cors = require('cors');

//static file
app.use(cors());
app.use(express.static(__dirname));

var route = require('./routes/route')(app);



