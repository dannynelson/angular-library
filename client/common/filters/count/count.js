/**
 * Counts the number of elements in an array
 */

angular.module('filters.count', [])

.filter('count', function() {
  return function(array) {
    return array.length;
  };
});
