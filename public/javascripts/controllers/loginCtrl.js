/* Andrew Kralovec 
 * Login controller 
 * Logic written in Javascript, responsible for checking user login creditionals, and then logging the user in  
 */
var app = angular.module('myApp', []);
app.controller('loginController', function ($scope, $http) {
      $scope.login = function (username, password) {
            var objectJson = { 'username': username, 'password': password };
            // Send user login object to server for validation 
            $http.post('/loginRequest', objectJson).success(function (response) {
                  // Redirect to the correction location 
                  location.href = response.address;
            }).error(function (response) {
                  // We did not find the user in the database 
                  alert("Failed login");
            });
      };
}); 