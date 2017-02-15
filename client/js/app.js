var app=angular.module('app', [])
.factory('socket', function ($rootScope) {
  var socket = io("http://localhost:8081");
  return socket;
})
