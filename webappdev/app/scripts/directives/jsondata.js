'use strict';

/**
 * @ngdoc directive
 * @name webappdevApp.directive:JSONData
 * @description
 * # JSONData
 */
angular.module('TodoList')
  .directive('jsonData', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope[attrs.ngModel] = JSON.parse(element.html());
        scope.$broadcast('data-ready');

      }
    };
  });
