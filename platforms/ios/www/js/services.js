angular.module('services')
.factory('Users', function ($http) {
	return {
		create: function (username, password, callback) {
			var json = {
				username: username,
				password: password
			};
			var headers = {
				'X-Api-Token': 'SYDx2D9P7dC1u4tm7SIzcBciU1zF9KbD8Jmw1LgjuTgurwXpS4C3AunCo2pMz7ZqJEzT/EwWknNNmisKGsNatg==',
				'X-Access-Token': 'sqb0mf1bfy/83AIqBz533sCn2UQeHqlgqZRNjsdYcpDLMR/+iiOt5hkWvZ88zBdoHjv6x7iWeXsQz7uBW7ZUKQ=='
			};
			$http
			.post('http://ionic.goldarkapi.com/users', JSON.stringify(json), {headers: headers})
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