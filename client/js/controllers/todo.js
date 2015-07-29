angular
  .module('app')
  .controller('TodoController', ['$scope', '$state', 'Todo', function($scope,
      $state, Todo) {
    $scope.todos = [];
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;

    function getTodos() {
      Todo
        .find({
          filter: { 
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage }        
        })
        .$promise
        .then(function(results) {
          $scope.todos = results;             
        });

      Todo
        .count()
        .$promise
        .then(function(results) {
          $scope.totalItems = results.count;              
        });
    }

    getTodos();

    $scope.pageChanged = function() {
      getTodos();
    };

    $scope.addTodo = function() {
      Todo
        .create($scope.newTodo)
        .$promise
        .then(function(todo) {
          $scope.newTodo = '';
          $scope.todoForm.content.$setPristine();
          $('.focus').focus();
          getTodos();
        });
    };

    $scope.removeTodo = function(item) {
      Todo
        .deleteById(item)
        .$promise
        .then(function() {
          getTodos();
        });
    };
  }]);
