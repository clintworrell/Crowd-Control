var express = require('express');
var router = express.Router();
var request = require('request');

// Environment config in .env
require('dotenv').config();

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_USERNAME = process.env.LASTFM_USERNAME;

var lastFmRecentTracksUrl = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json`;

router.get('/', function(req, res) {
  request.get(lastFmRecentTracksUrl, function(error, response, body) {
    var recentTracks = JSON.parse(body).recenttracks;
    if (recentTracks.track[0]['@attr'] && recentTracks.track[0]['@attr'].nowplaying === 'true') {
      var currentTrackName = recentTracks.track[0].name;
      var currentTrackArtist = recentTracks.track[0].artist['#text'];
      res.send(currentTrackName + ' - ' + currentTrackArtist);
    } else { res.send("No track is currently playing"); }

  });
});

module.exports = router;
