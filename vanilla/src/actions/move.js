var MoveShapeAction = function(layer, initialPosition, shapeView) {
  var offset = shapeView.getOffset(initialPosition);

  return {
    update: function(updatedPosition) {
      var base    = shapeView.getOrigin().coords();
      var current = [base[0] + offset[0], base[1] + offset[1]];

      var updated = updatedPosition.coords();
      var moveBy  = [updated[0] - current[0], updated[1] - current[1]];

      shapeView.move(moveBy[0], moveBy[1]);
      shapeView.draw(layer);
    }
  }
};
