var express = require('express');
var request = require('request');
var spotifyAuth = require('../routes/spotifyAuth').spotifyAuth;
var router = express.Router();

router.get('/', function(req, res) {
  // console.log(spotifyAccess.token);
  // res.send("/api/playlist.js response");
  var options = {
    url: `https://api.spotify.com/v1/users/${spotifyAuth.userId}/playlists`,
    headers: { 'Authorization': 'Bearer ' + spotifyAuth.accessToken },
    json: true
  };
  console.log(options);

  request.get(options, function(error, response, body) {
    res.send(body);
  });
});

router.get('/spotifytest', function(req, res) {
  var options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { 'Authorization': 'Bearer ' + spotifyAuth.accessToken },
    json: true
  };

  request.get(options, function(error, response, body) {
    res.send(body);
  });
});

router.get('/playlisttest', function(req, res) {
  var options = {
    url: `https://api.spotify.com/v1/users/${spotifyAuth.userId}/playlists`,
    headers: { 'Authorization': 'Bearer ' + spotifyAuth.accessToken },
    json: true
  };
  console.log(options);

  request.get(options, function(error, response, body) {
    res.send(body);
  });
});

router.get('/gettracks', function(req, res) {
  playlistId = '0EG91dlNQBzsd941EV9a6R';
  var options = {
    url: `https://api.spotify.com/v1/users/${spotifyAuth.userId}/playlists/${playlistId}/tracks`,
    headers: { 'Authorization': 'Bearer ' + spotifyAuth.accessToken },
    json: true
  };

  request.get(options, function(error, response, body) {
    var numTracks = body.items.length;
    for (var i = 0; i < numTracks; i++)
    res.send(body);
  });
});

router.post('/curltest', function(req, res) {
  // var currentTrackArtist = req.body['xesam:artist'];
  // var currentTrackTitle = req.body['xesam:title'];
  // var currentTrackId = req.body['mpris:trackid'];
  // console.log(`Artist: ${currentTrackArtist}`);
  // console.log(`Title: ${currentTrackTitle}`);
  // console.log(`Track ID: ${currentTrackId}`);
  console.log(req.body);
  // res.send({'Message': 'Done'});
  res.send();
});

module.exports = router;
