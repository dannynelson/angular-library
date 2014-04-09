/**
 * @ngdoc directive
 * @name dragDropFile
 * @restrict A
 *
 * @description
 * Drag and drop a file over element to upload, and save to given variable.
 *
 * @param {string=} dragDropFile Variable that will save dataURI (in Base64) once file uploaded.
 *
 * @example
 * $scope.photoUrl = ''; // photo URI will be attached here
 * <div drag-drop-file="photoUrl"></div>
 */

angular.module('directives.dragDropFile', [])

.directive('dragDropFile', function () {
  return {
    restrict: 'A',
    // templateUrl: 'directives.dragDropFile.html',
    scope: {
      dragDropFile: '=',
    },
    link: function (scope, element, attrs) {
      var rawElement = element[0];
      rawElement.ondragover = function () {
        // this.className = 'hover';
        return false;
      };
      // rawElement.ondragend = function () {
      //   // this.className = '';
      //   return false;
      // };
      rawElement.ondrop = function (e) {
        this.className = '';
        e.preventDefault();

        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
          debugger;
          scope.$apply(function() {
            scope.photoUrl = event.target.result;
          });
        };
        reader.readAsDataURL(file);
      };
    }
  };
});
