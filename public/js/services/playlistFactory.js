app.factory('playlistFactory', function($http) {
    var playlist = [];
    var factory = {};

    factory.testPlaylist = function () {
      playlist.push("Test1");
      playlist.push("Test2");
      playlist.push("Test3");
      return playlist;
    };

    factory.getPlaylists = function (callback) {
      $http.get('/api/playlists').success(callback);
    };

    return factory;
});
