angular.module('app', ['ionic', 'app.controllers', 'GoldarkSDK', 'LocalStorageModule'])
    .config(function($stateProvider, $urlRouterProvider, $httpProvider, goldarkConfigProvider) {
        goldarkConfigProvider.setAPIToken('r1y2BOI1iIcIa0JCj4RvW1YIgfLCzo60bdg0Uq46jRSNqZk3X1iv9VELvbxOuUQCwBrfRO7CofZUdfeKC7f1XA==');
        goldarkConfigProvider.setBackendName('127');

        $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            controller: 'AppCtrl'
        })
        .state('home', {
            url: '/home',
            controller: 'HomeCtrl',
            templateUrl: 'templates/home.html',
        });
        $urlRouterProvider.otherwise('/home');
    });