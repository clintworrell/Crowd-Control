var express = require('express');
var querystring = require('querystring');
var router = express.Router();

// Environment config in .env
require('dotenv').config();

var SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
var SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

/*
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
*/
function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

var stateKey = 'spotify_auth_state';

router.get('/', function(req, res) {
  /*
   * State is a random string used to correlate requests and responses. The
   * redirect_uri can be guessed so using a state value increases assurance that
   * an incoming connection is the result of an authentication request.
  */
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  /*
   * Scope is the permissions that the application is requesting on the user's
   * Spotify account.
  */
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: SPOTIFY_REDIRECT_URI,
      state: state,
      scope: scope
    })
  );
});

module.exports = router;
