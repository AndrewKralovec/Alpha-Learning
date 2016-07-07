var app = angular.module('quizCreaterModule', []);
app.controller('quizCreaterCtrl',function($scope,$http){
  $scope.questions = [];
  
  // Add question
  $scope.push = function(question) {
    try {
      question.id = $scope.questions.length ; 
      $scope.questions.push(question);
      $scope.question = null ; 
    } catch (error) {
      console.log(error); 
    }
  };
  // Remove question
  $scope.remove = function(){
    $scope.questions.pop(); 
  };
  // Upload questions
  $scope.upload = function(){
    try {
      // Launch
    } catch (error) {
      console.log(error); 
    }
  }; 
  
    
}); 