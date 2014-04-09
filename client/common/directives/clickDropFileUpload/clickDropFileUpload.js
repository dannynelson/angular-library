/**
 * @ngdoc directive
 * @name clickDropFileUpload
 * @restrict A
 *
 * @description
 * Upload a file either by clicking on element, or dragging and dropping file over element
 * -  after file upload, file fills the the container as background-image
 * - 'hover' class added to element when dragging file over it, if you want to add css styles
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
      var rawElement = element[0];
      var setBackgroundImg = function(dataURI) {
        rawElement.style.background = 'url('+ dataURI +') no-repeat center';
        rawElement.style.backgroundSize = '100% 100%';
      };
      // click upload
      
      element.on('click', function(e) {
        var $fileInput = angular.element('<input type="file"/>');
        $fileInput[0].click();
        $fileInput.on('change', function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              var dataURI = loadEvent.target.result;
              scope.clickDropFileUpload = dataURI;
              setBackgroundImg(dataURI);
            });
          };
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      });

      // drag and drop upload
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
            var dataURI = event.target.result;
            scope.clickDropFileUpload = dataURI;
            setBackgroundImg(dataURI);
          });
        };
        reader.readAsDataURL(file);
      };
    }
  };
});

