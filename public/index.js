const express = require('express');

const app = express();
const cors = require('cors');

// static file
app.use(cors());
app.use(express.static(__dirname));

const route = require('./routes/route')(app);
