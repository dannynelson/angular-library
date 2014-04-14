angular.module('app', [
  'directives.imageUpload',
  'directives.clickFileUpload',
  'directives.dropFileUpload',
  'directives.clickDropFileUpload'
])

.controller('MainCtrl', function($scope) {
  $scope.values = [1,2,3];
  $scope.photoUrl = 'http://placehold.it/100x100';
  $scope.nested = "hello";
});
