/**
 * @ngdoc directive
 * @name clickFileUpload
 * @restrict A
 *
 * @description
 * When element is clicked, trigger a file upload prompt, and save file to given variable
 *
 * @param {string=} clickFileUpload Variable where dataURI (in Base64) is saved once file uploaded.
 *
 * @example
 * $scope.photoUrl = ''; // photo URI will be attached here
 * <button click-file-upload="photoUrl">Upload a File</button>
 */

angular.module('directives.clickFileUpload', [])

.directive("clickFileUpload", function () {
  return {
    scope: {
      clickFileUpload: "="
    },
    link: function (scope, element, attributes) {
      var $input = angular.element('<input type="file"/>');
      element.on('click', function(e) {
        $input[0].click();
      });
      $input.on('change', function (changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            scope.clickFileUpload = loadEvent.target.result;
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  };
});

