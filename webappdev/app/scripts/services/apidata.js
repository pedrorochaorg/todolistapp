'use strict';

/**
 * @ngdoc service
 * @name TodoList.APIData
 * @description
 * # APIData
 * Service in the TodoList.
 */
angular.module('TodoList')
  .service('APIData', ['$http','$q',function ($http,$q) {
    return {
      getTodos: function (grupo) {
        var url = apiUrl + '/todos'
        if (grupo != null && grupo != undefined) {
          url = url + '?grupo=' + grupo;
        }
        return $http.get(url)
          .then(function (response) {
            if (typeof response.data === 'object') {
              return response.data;
            } else {
              // invalid response
              return $q.reject(response.data);
            }

          }, function (response) {
            // something went wrong
            return $q.reject(response.data);
          });
      },
      createTodo: function (todo) {
        return $http.post(apiUrl + '/todos', todo).then(function (response) {
          if (typeof response.data === 'object') {
            return response.data;
          } else {
            // invalid response
            return $q.reject(response.data);
          }

        }, function (response) {
          // something went wrong
          return $q.reject(response.data);
        });
      },
      updateTodo: function (todo) {
        return $http.post(apiUrl + '/todos/' + todo.id + '/', todo).then(function (response) {
          if (typeof response.data === 'object') {
            return response.data;
          } else {
            // invalid response
            return $q.reject(response.data);
          }

        }, function (response) {
          // something went wrong
          return $q.reject(response.data);
        });
      },
      deleteTodo: function (todo) {
        return $http.delete(apiUrl + '/todos/' + todo + '/').then(function (response) {

          if (response.status === 204) {
            return true;
          } else {
            // invalid response
            return $q.reject(response.data);
          }

        }, function (response) {
          // something went wrong
          return $q.reject(response.data);
        });
      }
    }
  }]);
