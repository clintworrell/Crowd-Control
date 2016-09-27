var app = angular.module('playlistApp', ['ngRoute', 'emguo.poller']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/',
      {
        controller: 'PlaylistsController',
        templateUrl: '../templates/playlists.html'
      })
    .when('/playlist/:playlistId',
      {
        controller: "PlaylistController",
        templateUrl: '../templates/playlist.html'
      });
});
