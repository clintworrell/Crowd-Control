var express = require('express');
var request = require('request');
var spotifyAuth = require('../routes/spotifyAuth').spotifyAuth;
var router = express.Router();

router.get('/:searchQuery', function(req, res) {
  var searchQuery = req.params.searchQuery;
  var options = {
    url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=album,artist,playlist,track`,
    headers: { 'Authorization': 'Bearer ' + spotifyAuth.accessToken },
    json: true
  };
  request.get(options, function(error, response, body) {
    res.send(body);
  });
});

module.exports = router;
