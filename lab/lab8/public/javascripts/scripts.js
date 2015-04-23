var app = angular.module('SparqlServer', []);

app.controller('sendquery', function($scope, $http) {
  $scope.send = function() {
		$scope.queries = null;
    $scope.myResults=false;
    var posting = $http({
        method: 'POST',
        /*posting to /post */
        url: '/sparql',
        data: { query: $("#query").val()},
        processData: false
    })
    posting.success(function (response) {
        $scope.queries=response;
        $scope.myResults=!$scope.myResults;
        console.log(response);
    });

	};
});
