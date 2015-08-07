(function (app) {
  app.directive('rectangleView', function() {
    return {
      link: function($scope, el) {
        console.log($scope, el);
      }
    }
  });
})
(angular.module('interactionMap'));


