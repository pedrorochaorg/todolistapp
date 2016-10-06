'use strict';

/**
 * @ngdoc function
 * @name TodoList.controller:CreatetodoCtrl
 * @description
 * # CreatetodoCtrl
 * Controller of the TodoList
 */
angular.module('TodoList')
  .controller('CreatetodoCtrl', ['$scope','$timeout','APIData',function ($scope,$timeout,APIData) {
      $scope.userGrupo = '';
      $scope.preloader = false;
      $scope.newTodo = '';
      $scope.setup = function(grupo){
        $scope.userGrupo = grupo;
      };

      function cleanMessages(){
        $scope.newTodo = '';
      }

      $scope.submitForm = function(formValue){
        if($scope.todoForm.$valid){
          $scope.preloader = true;

          APIData.createTodo({text: formValue,user:$scope.userGrupo.id,grupo:$scope.userGrupo.grupo}).then(function (data) {
            console.log(data);
            $scope.preloader = false;

            $scope.newTodo = 'Todo Created';
            $timeout(cleanMessages,5000);


          }, function (error) {
            $scope.newTodo = 'Error';

            $timeout(cleanMessages,5000);
          });
        }
      };


  }]);
