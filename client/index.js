angular.module('app', [
  'directives.clickFileUpload'
])

.controller('MainCtrl', function($scope) {
  $scope.values = [1,2,3];
  $scope.photoUrl = 'http://placehold.it/100x100';
});
