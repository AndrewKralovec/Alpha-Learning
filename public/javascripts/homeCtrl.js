var app = angular.module('docModule', []);
app.controller('docCtrl', function ($scope, $http) {
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