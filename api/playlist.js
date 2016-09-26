var express = require('express');
var request = require('request');
var spotifyAuth = require('../routes/spotifyAuth').spotifyAuth;
var router = express.Router();

router.get('/:playlistId', function(req, res) {
  var playlistId = req.params.playlistId;
  var options = {
    url: `https://api.spotify.com/v1/users/${spotifyAuth.userId}/playlists/${playlistId}/tracks`,
    headers: { 'Authorization': 'Bearer ' + spotifyAuth.accessToken },
    json: true
  };
  request.get(options, function(error, response, body) {
    res.send(body);
  });
});

module.exports = router;
