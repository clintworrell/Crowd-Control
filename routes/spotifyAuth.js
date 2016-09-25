var express = require('express');
var request = require('request');
var router = express.Router();

require('dotenv').config();

var SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
var SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
var SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

var spotifyAuth = {};

router.get('/', function(req, res) {
  var stateKey = 'spotify_auth_state';
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  var error = req.query.error || null;

  if (state === null) {
    res.send("Error authenticating application with Spotify");
    throw new Error("Invalid 'state' parameter: did not receive a 'state' parameter from Spotify auth callback");
  } else if (state !== storedState) {
    res.send("Error authenticating application with Spotify");
    throw new Error(`Invalid 'state' parameter: ${state} 'state' parameter returned from Spotify auth callback does not match storedState(${storedState}).`);
  } else if (state === storedState && error) {
    res.clearCookie(stateKey);
    res.send("Error authenticating application with Spotify");
    throw new Error(`'state' parameter matched storedState but Spotify responded with error '${error}'`);
  } else if (code) {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: SPOTIFY_REDIRECT_URI
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        json: true
      };
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          spotifyAuth.accessToken = body.access_token;
          spotifyAuth.refreshToken = body.refresh_token;
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + spotifyAuth.accessToken },
            json: true
          };

          request.get(options, function(error, response, body) {
            spotifyAuth.userId = body.id;
            res.send("Application has been authenticated with Spotify");
          });
        }
      });

    }
});

module.exports.router = router;
module.exports.spotifyAuth = spotifyAuth;
