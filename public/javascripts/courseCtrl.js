/* Andrew Kralovec 
 * Course controller 
 * Logic written in Javascript, responsible for formatting what the user sees on the Course page
 * This, for the moment, includes the count of courses,and at which index to split the courses up on the page 
 */
var app = angular.module('courseModule', [], function ($locationProvider) {
    // Rewrite $locationProvider, to use hashbang as default mode.
    // ALL link tags must have the '_self', so it puts the new document in the same window and frame as the current document.
    $locationProvider.html5Mode(true);
});
app.controller('courseCtrl', function ($scope, $http, $location) {
    $scope.Math = window.Math;
    $scope.currentUrl = $location.path();
    $scope.postRequest = function (address,post) {
        // Save speed, by posting arleady loaded post object to router 
        $http.post(address, post).success(function (response) {
            // All good
        });
    };
    $scope.getPags = function (num) {
        alert(Math.ceil(num / 1));
        return (new Array(Math.ceil(num / 1)));
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