/* Andrew Kralovec 
 * profile controller 
 * Logic written in Javascript, responsible for formatting what the user sees on the home page
 * This, for the moment, includes the count of courses,and at which index to split the courses up on the page 
 */
var app = angular.module('profileModule', []);
app.controller('profileCtrl', function ($scope, $http) {
    $scope.Math = window.Math;
   
    
    $scope.getPags = function (num) {
        alert(Math.ceil(num/1));
        return (new Array(Math.ceil(num/1))); 
    }
    $scope.range = function (min, max) {
        return function (doc) {
            var i = $scope.documents.indexOf(doc);
            return (i >= min - 1 && i <= max - 1);
        };
    };
    //$scope.documents = documents ; 
    
    // Show corresponding content to the file type. 
    $scope.showType = function (type) {
        if (type.includes("image")) {
            return true; 
            // }else if(type.includes("text")){
            // }else if(type.includes("pdf")){
        }
        else {
            return false
        }
    };
}); 