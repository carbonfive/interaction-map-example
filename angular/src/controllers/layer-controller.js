(function (app) {
  app.controller('LayerController', function() {
    console.log('layer controller!');

    $scope.objects = [];

    this.objectsContaining = function (point) {
      return $scope.objects.filter(function(obj) {
        return obj.contains(point);
      });
    };

    this.topObjectContaining = function (point) {
      return this.objectsContaining(point).sort(function(a,b){
        return b.element.style.zIndex - a.element.style.zIndex;
      })[0];
    };
  });
})
(angular.module('interactionMap'));
