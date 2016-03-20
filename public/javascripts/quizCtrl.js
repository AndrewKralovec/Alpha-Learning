var app = angular.module('quizModule', []);
app.controller('quizController', function($scope, $http) {

  $scope.start = function() {
    $scope.id = 0;
    $scope.quizOver = false;
    $scope.inProgress = true;
    $scope.getQuestion();
  };

  $scope.reset = function() {
    $scope.inProgress = false;
    $scope.score = 0;
  };

  $scope.nextQuestion = function() {
    $scope.correctAnswer = false; 
    $scope.id++;
    $scope.getQuestion();
  };

  $scope.quizOver = function() {

  };

  $scope.requestQuestion = function(id) {
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

    if (id < questions.length) {
      return questions[id];
    } else {
      $scope.reset();
    }
  };

  $scope.getQuestion = function() {
    var q = $scope.requestQuestion($scope.id);
    if (q) {
      $scope.question = q.question;
      $scope.options = q.options;
      $scope.answer = q.answer;
      $scope.answerMode = true;
    } else {
      $scope.quizOver = true;
    }
  };
  
   $scope.TestClick = function(index) {
     alert("Working"+index);
   };

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


