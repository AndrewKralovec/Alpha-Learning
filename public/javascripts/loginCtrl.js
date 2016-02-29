var app = angular.module('myApp',[]); 
app.controller('loginController',function($scope,$http) {
		$scope.login = function(username,password) {
		var objectJson = {'username':username,'password':password}; 
		$http.post('/loginRequest',objectJson).success(function(response) {
            location.href = response.address;
      }).error(function(response){
          alert("Failed login");
      });
	};
}); 