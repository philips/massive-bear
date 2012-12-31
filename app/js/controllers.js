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
