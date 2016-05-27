var app = angular.module('myApp',[]);
app.controller('registerController',function($scope,$http) {
    $scope.register = function(username,password) {
        var objectJson = {'username':username,'password':password,'lastname':lastname,'firstname':firstname};
        // Send user login object to server for validation
        $http.post('/register',objectJson).success(function(response) {
            // Redirect to the correction location
            location.href = response.address;
        }).error(function(response){
            // We did not find the user in the database
            alert("Failed registration");
        });
    };
});