var cookieParser = require('cookie-parser');
var express = require('express');

var admin = require('./routes/admin');
var spotifyAuth = require('./routes/spotifyAuth');

// Environment config in .env
require('dotenv').config();

var app = express();
var PORT = process.env.PORT;

app.use(cookieParser());

app.use('/admin', admin);
app.use('/spotify_auth_callback', spotifyAuth);

app.listen(PORT, function() {
  console.log(`Server is listening on port ${PORT}...`);
});
