app.controller('PlaylistsController', function($scope, playlistFactory) {
  $scope.view = {};
  // $scope.view.playlist = playlistFactory.testPlaylist();
  $scope.view.number = 8;
  playlistFactory.getPlaylists(function(data) {
    $scope.view.playlists = data.items;
  });
});
