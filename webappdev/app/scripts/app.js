'use strict';

/**
 * @ngdoc overview
 * @name TodoList
 * @description
 * # TodoList
 *
 * Main module of the application.
 */
var apiUrl = '/api';
var socketPath = 'http://localhost:3000';

angular
  .module('TodoList', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch'
  ]);
