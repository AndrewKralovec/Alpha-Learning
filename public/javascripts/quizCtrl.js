/* Andrew Kralovec 
 * Quiz controller 
 * Logic written in Javascript, responsible for taking the quiz. 
 */
var app = angular.module('quizModule', []);
app.controller('quizController', function($scope, $http) {

  // Start the quiz 
  $scope.start = function() {
    $scope.id = 0;
    $scope.quizOver = false;
    $scope.inProgress = true;
    $scope.getQuestion();
  };

  // Rest values
  $scope.reset = function() {
    $scope.inProgress = false;
    $scope.score = 0;
  };

  // Load next question 
  $scope.nextQuestion = function() {
    $scope.correctAnswer = false; 
    $scope.id++;
    $scope.getQuestion();
  };

  // When the quiz is over
  $scope.quizOver = function() {

  };

  // Get array fo questions from datatbase 
  $scope.requestQuestion = function(id) {
    // Static arrays for now 
    var questions = [{
      question: "What are objects that refer to the model. They act as glue between controller and view?",
      options: ["Controllers", "Directives", "Scopes", "Filters"],
      answer: 2
    }, {
      question: "JavaScript functions that are bound to a particular scope?",
      options: ["Controllers", "Directives", "Scopes", "Filters"],
      answer: 0
    }, {
      question: "Markers on DOM elements (such as elements, attributes, css, and more).?",
      options: ["Controllers", "Directives", "Scopes", "Filters"],
      answer: 1
    }, {
      question: "Whart are used for formatting data displayed to the user?",
      options: ["Controllers", "Directives", "Scopes", "Filters"],
      answer: 3
    }];

    // return the next question 
    if (id < questions.length) {
      return questions[id];
    } else {
      $scope.reset();
    }
  };

  // Load the next question 
  $scope.getQuestion = function() {
    var question = $scope.requestQuestion($scope.id);
    if (question) {
      $scope.question = question.question;
      $scope.options = question.options;
      $scope.answer = question.answer;
      $scope.answerMode = true;
    } else {
      $scope.quizOver = true;
    }
  };
   // Check valiation 
   $scope.TestClick = function(index) {
     alert("Working"+index);
   };
  // Check the if the user answer is correct 
  $scope.checkAnswer = function(index) {
    var choice = $scope.options[index] ; 
    var correct =  $scope.options[$scope.answer] ; 
    if (choice == correct) {
      alert("Correct");
      $scope.score++;
      $scope.correctAnswer = true;
    } else {
      alert("Wrong");
      $scope.correctAnswer = false;
    }

    $scope.answerMode = false;
  };

  $scope.reset();
});


