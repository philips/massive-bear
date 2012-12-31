'use strict';

/* Directives */

var feedback = angular.module('feedback.directives', []);

/* Sad face :(
 * https://github.com/angular/angular.js/issues/1277
 */
feedback.directive('ngFocus', function( $timeout ) {
  return function( scope, elem, attrs ) {
    scope.$watch(attrs.ngFocus, function( newval ) {
      if ( newval ) {
        $timeout(function() {
          elem[0].focus();
        }, 0, false);
      }
    });
  };
});
