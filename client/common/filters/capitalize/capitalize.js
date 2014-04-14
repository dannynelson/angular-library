/**
 * @ngdoc filter
 * @name capitalize
 *
 * @description
 * Capitalize the first letter in a string
 *
 * @param {string} word - Word or string to capitalize.
 *
 * @example
 * <div>{{ 'hello world' | capitalize }}</div>
 */

angular.module('filters.capitalize', [])

.filter('capitalize', function() {
  return function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
});
