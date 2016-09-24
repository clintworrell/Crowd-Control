var app = angular.module('playlistApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/',
      {
        controller: 'PlaylistsController',
        templateUrl: '../templates/playlists.html'
      });
});
