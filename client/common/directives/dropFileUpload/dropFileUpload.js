/**
 * @ngdoc directive
 * @name dropFileUpload
 * @restrict A
 *
 * @description
 * Drag and drop a file over element to upload, and save to given variable.
 *
 * @param {string=} dropFileUpload Variable that will save dataURI (in Base64) once file uploaded.
 *
 * @example
 * $scope.photoUrl = ''; // photo URI will be attached here
 * <div drop-file-upload="photoUrl"></div>
 */

angular.module('directives.dropFileUpload', [])

.directive('dropFileUpload', function () {
  return {
    restrict: 'A',
    scope: {
      dropFileUpload: '=',
    },
    link: function (scope, element, attrs) {
      var rawElement = element[0];
      rawElement.ondragover = function () {
        this.className = 'hover';
        return false;
      };
      rawElement.ondragend = function () {
        this.className = '';
        return false;
      };
      rawElement.ondrop = function (e) {
        this.className = '';
        e.preventDefault();

        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
          debugger;
          scope.$apply(function() {
            scope.dropFileUpload = event.target.result;
          });
        };
        reader.readAsDataURL(file);
      };
    }
  };
});
