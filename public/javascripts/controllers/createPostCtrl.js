/* Andrew Kralovec 
 * Create Post Controller 
 * Logic written in Javascript, responsible for formatting Tinymc module 
 * Along with uploading the markup to the server  
 */
// Binds a TinyMCE widget to <textarea> elements.
angular.module('ui.tinymce', [])
    .value('uiTinymceConfig', {})
    .directive('uiTinymce', ['uiTinymceConfig', function (uiTinymceConfig) {
        uiTinymceConfig = uiTinymceConfig || {};
        var generatedIds = 0;
        return {
            require: 'ngModel'
            , link: function (scope, elm, attrs, ngModel) {
                var expression, options, tinyInstance
                    , updateView = function () {
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    };
                // generate an ID if not present
                if (!attrs.id) {
                    attrs.$set('id', 'uiTinymce' + generatedIds++);
                }

                if (attrs.uiTinymce) {
                    expression = scope.$eval(attrs.uiTinymce);
                } else {
                    expression = {};
                }
                options = {
                    // Update model when calling setContent (such as from the source editor popup)
                    setup: function (ed) {
                        var args;
                        ed.on('init', function (args) {
                            ngModel.$render();
                        });
                        // Update model on button click
                        ed.on('ExecCommand', function (e) {
                            ed.save();
                            updateView();
                        });
                        // Update model on keypress
                        ed.on('KeyUp', function (e) {
                            ed.save();
                            updateView();
                        });
                        // Update model on change, i.e. copy/pasted text, plugins altering content
                        ed.on('SetContent', function (e) {
                            if (!e.initial) {
                                ed.save();
                                updateView();
                            }
                        });
                        if (expression.setup) {
                            scope.$eval(expression.setup);
                            delete expression.setup;
                        }
                    }
                    , mode: 'exact'
                    , elements: attrs.id
                };
                // extend options with initial uiTinymceConfig and options from directive attribute value
                angular.extend(options, uiTinymceConfig, expression);
                setTimeout(function () {
                    tinymce.init(options);
                });


                ngModel.$render = function () {
                    if (!tinyInstance) {
                        tinyInstance = tinymce.get(attrs.id);
                    }
                    if (tinyInstance) {
                        tinyInstance.setContent(ngModel.$viewValue || '');
                    }
                };
            }
        };
}]);
var app = angular.module('postModule', ['ngSanitize', 'ui.tinymce']);
app.controller('postCtrl', function ($scope, $sce, $http) {
    // Bypass $sanitize
    $scope.sanitizeTrust = function (value) {
        return $sce.trustAsHtml(value);
    };
    // Automatic $sanitize
    $scope.sanitizeSafe = function (value) {
        return value;
    }
    $scope.postData = function () {
        var obj = {
            'name': $scope.postTitle
            , 'content': $scope.tinymceModel
            , 'timestamp': Date.now()
            , 'description': $scope.postDescription
        };
        $http.post('/Courses/AngularJS-address/CreatePostRequest', obj)
        .then(function mySucces(response) {
            console.log(response);
            alert("New Post Added"); 
        }, function myError(response) {
            console.log(response);
            alert(response); 
        });
    }
});