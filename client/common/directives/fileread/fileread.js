/**
 * Read the contents of a file upload, and save the contents to $scope in base64 URI
 *
 * <input id="photo" type="file" fileread="photo" accept="image/*" />
 * 
 * document.getElementById('photo').click();
 *
 * // after uploading...
 * $scope.photo = 'data:image/jpeg;base64,' + base64Data
 * 
 */

angular.module('directives.fileread', [])

.directive("fileread", function () {
  return {
    scope: {
      fileread: "="
      // newPhoto: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            scope.fileread = loadEvent.target.result;
            scope.newPhoto = true;
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  };
});
