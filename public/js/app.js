var app = angular.module('app', ['ngMaterial']);

app.controller('main', ['$scope', '$http', function ($scope, $http) {
  $http.get('/ajax/judo').
  then(function(response) {
  	console.log(response.data);
  	$scope.articles = response.data;
  }, function(response) {
  	console.log('Error : ' + response);
  });


  var allSizes = [25, 50, 75, 100],
  		sizes = [];

 	$scope.getFlex = function() {
		if(sizes.length === 0) sizes = angular.copy(allSizes);
		var size = sizes[~~(Math.random() * sizes.length)];
		sizes.splice(sizes.length - sizes.indexOf(size) - 1, sizes.length);
		return size;
  };

}]);

