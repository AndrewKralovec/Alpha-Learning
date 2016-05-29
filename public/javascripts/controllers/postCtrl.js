/*
 * Created by Andrew Kralovec 
 */
var app = angular.module('postModule', ['ngSanitize']);
app.controller('postCtrl', function ($scope, $sce) {
  //$scope.test = "<h1>Tags</h1>";
  $scope.default= {
    height:"300px",
    width:"300px",
    mediaHeight:"64px",
    mediaWidth:"64px"
  };
  // Bypass $sanitize
  $scope.sanitizeTrust = function (value) {
    return $sce.trustAsHtml(value);
  };
  // Automatic $sanitize
  $scope.sanitizeSafe = function (value) {
    return value;
  };
  $scope.postComment = function(value){
    $http.post('/Courses/AngularJS-address/CreateComment', value)
        .then(function mySucces(response) {
            console.log(response);
            alert('Comment Made');
        }, function myError(response) {
            console.log(response);
            alert(response);
        });
  };
});