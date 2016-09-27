var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

var admin = require('./routes/admin');
var spotifyAuth = require('./routes/spotifyAuth').router;
var playlist = require('./api/playlist');
var playlists = require('./api/playlists');
var currentTrack = require('./api/currentTrack');
var spotifySearch = require('./api/spotifySearch');

// Environment config in .env
require('dotenv').config();

var app = express();
var PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', express.static('public/index.html'));
app.use('/admin', admin);
app.use('/spotify_auth_callback', spotifyAuth);
app.use('/api/playlist', playlist);
app.use('/api/playlists', playlists);
app.use('/api/playlists/spotifytest', playlists);
app.use('/api/playlists/playlisttest', playlists);
app.use('/api/playlists/curltest', playlists);
app.use('/api/current_track', currentTrack);
app.use('/api/spotify_search', spotifySearch);


app.listen(PORT, '0.0.0.0', function() {
  console.log(`Server is listening on port ${PORT}...`);
});
