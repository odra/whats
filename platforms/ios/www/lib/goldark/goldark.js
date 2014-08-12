(function () {
	'use strict';
	var sdk = angular.module('GoldarkSDK', []);
	var directives = angular.module('GoldarkSDK.directives', ['GoldarkSDK']);
	var services = angular.module('GoldarkSDK.services', ['GoldarkSDK']);
	sdk.provider('goldarkConfig', function GoldarkConfigProvider () {
		var config = {
			apiToken: null,
			appName: null,
			accessToken: null
		};
		this.setAPIToken = function (apiToken) {
			config.apiToken = apiToken;
		};
		this.setBackendName = function (appName) {
			config.appName = appName;
		};
		this.$get = function () {
			return config;
		};
	});
	services.factory('GDObject', function ($http, goldarkConfig) {
		var config = goldarkConfig;
		var host = 'http://' + config.appName + '.0.0.1:5000';
		var headers = {
			'X-Api-Token': config.apiToken,
			'Content-Type': 'application/json;charset=utf-8'
		};
		if (config.accessToken) {
			headers['X-Access-Token'] = config.accessToken;
		}
		return {
			create: function (name, json, callback) {
				$http.post(host + '/' + name, json, {headers: headers})
				.success(function (data) {
					if (callback) {
						callback(data);
					}
				})
				.error(function (data) {
					if (callback) {
						callback(data);
					}
				});
			},
			search: function (name, json, callback) {
				var args = '';
            	for (var item in json) {
                	args += item + '=' + json[item] + '&';
            	}
            	//args = args.replace(/\&$/, '');
				$http.get(host + '/' + name + '?' + args, {headers: headers})
				.success(function (data) {
					if (callback) {
						callback(data);
					}
				})
				.error(function (data) {
					if (callback) {
						callback(data);
					}
				});
			},
			get: function (name, id, callback) {
				$http.get(host + '/' + name + '/' + id, {headers: headers})
	            .success(function (data) {
	                if (callback) {
	                    callback(data);
	                }
	            })
	            .error(function (data) {
	                if (callback) {
	                    callback(data);
	                }
	            });
			},
			update: function (name, id, json, callback) {
				$http.put(host + '/' + name + '/' + id, json, {headers: headers})
	            .success(function (data) {
	                if (callback) {
	                    callback(data);
	                }
	            })
	            .error(function (data) {
	                if (callback) {
	                    callback(data);
	                }
	            });
			},
			getField: function (name, id, field, callback) {
	            $http.get(host + '/' + name + '/' + id + '/' + field, {headers: {'X-Api-Token': apiToken}})
	            .success(function (data) {
	                if (callback) {
	                    callback(data);
	                }
	            })
	            .error(function (data) {
	                if (callback) {
	                    callback(data);
	                }
	            });
			},
			updateField: function (name, id, field, value, callback) {
				$http.put(host + '/' + name + '/' + id + '/' + field, {value: value}, {headers: {'X-Api-Token': apiToken}})
	            .success(function (data) {
	                if (callback) {
	                    callback(data);
	                }
	            })
	            .error(function (data) {
	                if (callback) {
	                    callback(data);
	                }
	            });
			}
		};
	});
	directives.directive('gdImage', ['$compile', '$http', 'goldarkConfig', function($compile, $http, goldarkConfig) {
		return {
			scope: {
				url: '@',
				placeholder: '@'
			},
			restrict: 'E',
			replace: true,
			link: function(scope, elem, attrs) {
				var config = goldarkConfig;
				var img = document.createElement('img');
				if (attrs.placeholder) {
					img.src = 'img/placeholder.png';	
				}
				elem.replaceWith(img);
				$http.get(attrs.url, {'headers':{ 'X-Api-Token': config.apiToken}})
				.success(function (data, status, headers, config) {
					img.src = 'data:' + headers('Content-Type') + ';base64,' + data;
				})
				.error(function (data, status, headers, config) {
					console.log(data);
				});
			}
		}
	}]);
	directives.directive('gdModel', ['$compile', 'GDObject', 'goldarkConfig', function($compile, GDObject, goldarkConfig) {
		return {
			scope: {
				name: '@',
				action: '@',
				params: '@',
				data: '@'
			},
			restrict: 'E',
			link: function(scope, elem, attrs) {
				var config = goldarkConfig;
				var ref = {
					'create': 'create',
					'search': 'search',
					'update': 'update',
					'get': 'get',
					'update-field': 'updateField',
					'get-field': 'getField'
				};
			}
		};
	}]);
}).call(this);