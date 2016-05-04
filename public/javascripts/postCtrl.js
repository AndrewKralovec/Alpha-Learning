/*
 * Created by Andrew Kralovec 
 */
var app = angular.module('postModule', ['ngSanitize']);
app.controller('postCtrl', function ($scope, $sce) {
  //$scope.test = "<h1>Tags</h1>";
  // Bypass $sanitize
  $scope.sanitizeTrust = function (value) {
    return $sce.trustAsHtml(value);
  };
  // Automatic $sanitize
  $scope.sanitizeSafe = function (value) {
    return value;
  }
});