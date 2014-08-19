
	angular.module('app.controllers', ['ngCordova', 'GoldarkSDK.services', 'services'])
	.controller('HomeCtrl', function ($scope, $ionicPopup, $ionicLoading, localStorageService, GDObject, $location, Users) {
		Users.create({'username': 'dassdsad', 'password': 'asdsadasd'}, function (data) {
			alert(data);
		});
	});