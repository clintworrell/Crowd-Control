app.controller('PlaylistController', function($scope, $routeParams, $http, $timeout, poller, playlistFactory) {
  $scope.view = {};
  $scope.view.playlistId = $routeParams.playlistId;
  $scope.view.searchQuery = "";
  $scope.view.currentTrack = "";
  // $scope.view.showSearch = false;
  // $scope.view.enableSearch = function() {
  //   $scope.view.showSearch = !$scope.view.showSearch;
  // };
  playlistFactory.getPlaylist($scope.view.playlistId, function(data) {
    $scope.view.playlist = data.items;
  });

  $scope.view.spotifySearch = function() {
    playlistFactory.spotifySearch($scope.view.searchQuery, function(data) {
      $scope.view.searchResults = data;
    });
  };

  var currentTrackPoller = poller.get('/api/current_track', {
    delay: 2000
  });

  currentTrackPoller.promise.then(null, null, function(data) {
    $scope.view.currentTrack = data.data;
  });
  // playlistFactory.currentTrack(function(data) {
  //   $scope.view.currentTrack = data;
  // });

});
