angular.module('app', [
  'directives.dragDropFile'
])

.controller('MainCtrl', function($scope) {
  $scope.values = [1,2,3];
  $scope.photoUrl = 'http://placehold.it/100x100';
});