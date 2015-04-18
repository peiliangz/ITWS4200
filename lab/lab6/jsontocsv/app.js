(function(angular){
  var app=angular.module('twitterconversion',[]);

  app.controller('MyController',['$scope',function($scope) {
    $scope.filename='somefile';
    $scope.saveName=function(){
    $scope.name=$scope.filename;
    };

  }]);



})(window.angular);
