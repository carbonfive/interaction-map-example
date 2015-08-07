(function (app) {
  app.directive('layer', function() {
    return {
      restrict: 'E',
      link: function($scope, $el, attrs, ctrl) {
        $scope.box = $el.getBoundingClientRect();
      }
    }
  });
})
(angular.module('interactionMap'));
