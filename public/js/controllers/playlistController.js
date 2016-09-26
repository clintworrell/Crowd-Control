app.controller('PlaylistController', function($scope, $routeParams, playlistFactory) {
  $scope.view = {};
  var playlistId = $routeParams.playlistId;
  playlistFactory.getPlaylist(playlistId, function(data) {
    $scope.view.playlist = data.items;
  });
});
