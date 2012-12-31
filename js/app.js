/*! massive-bear - v0.1.0 - 2012-12-31
* Copyright (c) 2012 Brandon Philips; Licensed  */

'use strict';


// Declare app level module which depends on filters, and services
angular.module('feedback', []);
angular.bootstrap(document.getElementById('feedback-footer'), ['feedback']);

'use strict';

/* Controllers */

function FeedbackCtrl($scope, $http) {
  $scope.submit = function() {
    if ($scope.feedback.length) {
      return $http.post('/feedback', {
        feedback: $scope.feedback
      }).then(function(response) {
        $scope.submitted = true;
        $scope.message = response.data.message;
      });
    }
  };

  $scope.clear = function() {
    $scope.feedback = '';
  };

  $scope.message = 'I wish this page would';
  $scope.feedback = 'have more bears...';
}
FeedbackCtrl.$inject = ['$scope', '$http'];

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

'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);

'use strict';

/* Controllers */
function MyCtrl1() {
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

'use strict';

/* Directives */

var myApp = angular.module('myApp.directives', []);

myApp.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);

'use strict';

/* Filters */

angular.module('myApp.filters', []).filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);

'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');
