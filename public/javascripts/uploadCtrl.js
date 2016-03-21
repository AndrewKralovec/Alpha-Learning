/* Andrew Kralovec 
 * Upload controller 
 * Logic written in Javascript, responsible for uploading the file the uer selections
 * Uses the ngFileUpload Directive 
 * ngFileUpload is a Angular JS directive to upload files using input type, file or drag&drop with ajax call.
 */
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('uploadController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      // Route waiting for upload
      url: 'fileUpload/uploadFile',
      // Object being uploaded to route 
      data: {file: file, username: $scope.username}, // extensions are not need because linux is GOD 
    });

    file.upload.then(function (response) {
      var test = response ; 
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }
}]);