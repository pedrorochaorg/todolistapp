'use strict';

/**
 * @ngdoc function
 * @name TodoList.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the TodoList
 */
function TodoItem(id,user,text,grupo,status,updated_at){

    this.id = id;
    this.user = user;
    this.text = text;
    this.grupo = grupo;
    this.status = status;
    this.updated_at = updated_at;

    this.editStatus = false;
}


angular.module('TodoList')
  .controller('TodoListCtrl', ['$scope','Socket','APIData',function ($scope,Socket,APIData) {

    $scope.preloader = true;
    $scope.items = [];
    Socket.on('message', function (data) {
      console.log(data);
      switch(data.action){
        case 'create':
        {
          if(data.data.grupo==$scope.grupo){
            $scope.items.push(new TodoItem(data.data.id, data.data.user, data.data.text, data.data.grupo, data.data.status, data.data.updated_at));
          }

          break;
        }
        case 'update':
        {
          if(data.data.grupo==$scope.grupo){
            for(var item in $scope.items){
              if($scope.items[item].id==data.data.id)
              {
                $scope.items[item] = new TodoItem(data.data.id, data.data.user, data.data.text, data.data.grupo, data.data.status, data.data.updated_at);
              }
            }
          }
          break;
        }
        case 'delete':
        {

          for(var item in $scope.items){
            if($scope.items[item].id==data.data)
            {
              $scope.items.splice(item,1);
            }
          }
          break;
        }


      }
      console.log($scope.grupo,$scope.items);


    });

    $scope.setup = function(grupo,user){
      $scope.userGrupo = user;
      $scope.grupo = grupo;

    };


    $scope.editTodoItem = function(data){

      data.editStatus = true;

    };

    $scope.saveTodoItem = function(data){

      APIData.updateTodo(data).then(function(data){
        if(data.status)
          data.editStatus = false;

      },function(err){

      });


    };

    $scope.cancelTodoItem = function(data){
      data.editStatus = false;


    };

    $scope.deleteTodoItem = function(data){

      APIData.deleteTodo(data.id);


    };


    $scope.$on('data-ready',function(){

      $scope.preloader = false;

      for(var item in $scope.data){

        $scope.items.push(new TodoItem($scope.data[item].id, $scope.data[item].user, $scope.data[item].text, $scope.data[item].grupo, $scope.data[item].status, $scope.data[item].updated_at));

      }

    });









  }]);
