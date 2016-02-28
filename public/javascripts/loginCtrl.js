var app = angular.module('myApp',[]); 
app.controller('loginController',function($scope,$http) {
		$scope.login = function(username,password) {
		var objectJson = {'username':username,'password':password}; 
		$http.post('login/loginRequest',objectJson).success(function(response) {
      	console.log("response: "+response);
      	alert(response);
      });
	};
}); 