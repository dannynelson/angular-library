/**
 * @ngdoc directive
 * @name dragDropFile
 * @restrict E
 *
 * @description
 * Add to a container to make it into a dynamic drag and drop a file upload area.
 *
 * @param {string=} photoUrl Data URI in Base64 format created after file is dropped.
 */

angular.module('directives.dragDropFile', [])

.directive('dragDropFile', function () {
  return {
    restrict: 'A',
    // templateUrl: 'directives.dragDropFile.html',
    scope: {
      photoUrl: '=',
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
        debugger;
        this.className = '';
        e.preventDefault();

        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
          debugger;
          scope.$apply(function() {
            scope.photoUrl = event.target.result;
          });
          // console.log(event.target);
          // rawElement.style.background = 'url(' + event.target.result + ') no-repeat center';
        };
        console.log(file);
        reader.readAsDataURL(file);

        return false;
      };
    }
  };
});
