/**
 * @ngdoc directive
 * @name imageUpload
 * @restrict E
 *
 * @description
 * Create a customizable image upload element.
 * -  Upload file either by clicking on element, or dragging and dropping file over element
 * -  after file upload, file fills the container as background-image
 * - 'hover' class added to element when dragging file over it
 *
 * @param {string=} photoUrl Variable where dataURI (in Base64) is saved once file uploaded.
 * @param {string} [name="image"] Optionally override product name.
 * @param {string} [defaultImg="assets/flower-img.png"] Optionally override default flower image that displays.
 * @param {string} [height="200px"] Optionally override height.
 * @param {string} [width="200px"] Optionally override width.
 *
 * @example
 * $scope.photoUrl = ''; // data URI will be attached here
 * <image-upload
 *   photo-url="photoUrl"
 *   name="product logo"
 *   default-img="assets/another-img.png"
 *   width="300px"
 *   height="200px">
 * </image-upload>
 */


angular.module('directives.imageUpload', [])

.directive("imageUpload", function () {
  return {
    restrict: 'E',
    scope: {
      photoUrl: "=",
      name: "@",
      defaultImg: "@",
      width: "@",
      height: "@"
    },
    replace: true,
    templateUrl: 'directives.imageUpload.html',
    link: function (scope, element, attributes) {
      var rawElement = element[0];
      scope.name = scope.name || 'image';

      element.css({
        width: scope.width || '200px',
        height: scope.height || '200px',
      });

      var setBackgroundImg = function(dataURI) {
        element.css({
          background: 'url('+ dataURI +') no-repeat center',
          backgroundSize: '100% 100%'
        });
        element.find('.image-info').css({
          display: 'none'
        });
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
              scope.photoUrl = dataURI;
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
            scope.photoUrl = dataURI;
            setBackgroundImg(dataURI);
          });
        };
        reader.readAsDataURL(file);
      };
    }
  };
});

