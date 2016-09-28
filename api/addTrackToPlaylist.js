var express = require('express');
var request = require('request');
var spotifyAuth = require('../routes/spotifyAuth').spotifyAuth;
var router = express.Router();

router.get('/:trackUri/playlist/:playlistId', function(req, res) {
  var trackUri = req.params.trackUri;
  var playlistId = req.params.playlistId;
  var options = {
    url: `https://api.spotify.com/v1/users/${spotifyAuth.userId}/playlists/${playlistId}/tracks?uris=${trackUri}`,
    headers: { 'Authorization': 'Bearer ' + spotifyAuth.accessToken }
  };
  request.post(options, function(error, response, body) {
    res.send(response);
  });

});

module.exports = router;
