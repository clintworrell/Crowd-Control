app.factory('playlistFactory', function($http) {
    var playlist = [];
    var factory = {};

    // factory.testPlaylist = function () {
    //   playlist.push("Test1");
    //   playlist.push("Test2");
    //   playlist.push("Test3");
    //   return playlist;
    // };

    factory.getPlaylists = function (callback) {
      $http.get('/api/playlists').success(callback);
    };

    factory.getPlaylist = function (playlistId, callback) {
      $http.get(`/api/playlist/${playlistId}`).success(callback);
    };

    factory.spotifySearch = function(searchQuery, callback) {
      $http.get(`/api/spotify_search/${searchQuery}`).success(callback);
      // console.log("WHY AM I BEING CALLED?");
    };

    factory.currentTrack = function(callback) {
      $http.get('/api/current_track').success(callback);
    };

    factory.addTrackToPlaylist = function(trackUri, playlistId, callback) {
      // console.log(trackUri + ' - ' + playlistId);
      $http.get(`/api/track/${trackUri}/playlist/${playlistId}`).success(callback);
    };

    return factory;
});
