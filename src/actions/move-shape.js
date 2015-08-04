var MoveShapeAction = function(moveOrigin, shape) {
  var offset = Point.compare(moveOrigin, shape.getOrigin());

  return {
    update: function(point) {
      var diff      = Point.compare(point, shape.getOrigin());
      var newOrigin = Point.compare(diff, offset);
      shape.move(newOrigin);
      shape.draw();
    }
  }
};
