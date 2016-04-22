/* Andrew Kralovec 
 * Course controller 
 * Logic written in Javascript, responsible for formatting what the user sees on the Course page
 * This, for the moment, includes the count of courses,and at which index to split the courses up on the page 
 */
var app = angular.module('courseModule', [],function($locationProvider){
    // Rewrite $locationProvider, to use hashbang as default mode.
    $locationProvider.html5Mode(true);
});
app.controller('courseCtrl', function ($scope, $http, $location) {
    $scope.Math = window.Math;
    $scope.currentUrl = $location.path(); 
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