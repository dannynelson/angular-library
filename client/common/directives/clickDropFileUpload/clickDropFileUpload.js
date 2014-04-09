/**
 * @ngdoc directive
 * @name clickDropFileUpload
 * @restrict A
 *
 * @description
 * Upload a file either by clicking on element, or dragging and dropping file over element
 * - 'hover' class added to element when dragging over it
 *
 * @param {string=} clickDropFileUpload Variable where dataURI (in Base64) is saved once file uploaded.
 *
 * @example
 * $scope.photoUrl = ''; // photo URI will be attached here
 * <div click-drop-file-upload="photoUrl">Upload a File</div>
 */

angular.module('directives.clickDropFileUpload', [])

.directive("clickDropFileUpload", function () {
  return {
    scope: {
      clickDropFileUpload: "="
    },
    link: function (scope, element, attributes) {
      // click upload
      element.on('click', function(e) {
        var $fileInput = angular.element('<input type="file" id="directives-click-file-upload"/>');
        $fileInput[0].click();
        $fileInput.on('change', function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.clickDropFileUpload = loadEvent.target.result;
            });
          };
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      });

      // drag and drop upload
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
          scope.$apply(function() {
            scope.clickDropFileUpload = event.target.result;
          });
        };
        reader.readAsDataURL(file);
      };
    }
  };
});

