(function (app) {
  app.controller('CanvasController', function($scope) {
    console.log('canvas controller!');

    $scope.ctrlName = 'LayerController';
  });
})
(angular.module('interactionMap'));
