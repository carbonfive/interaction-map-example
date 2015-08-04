var MoveShapeAction = function(moveOrigin, shape) {
  var offset = moveOrigin.difference(shape.getOrigin());

  return {
    update: function(point) {
      var diff      = point.difference(shape.getOrigin());
      var newOrigin = diff.difference(offset);
      shape.move(newOrigin);
      shape.draw();
    }
  }
};
