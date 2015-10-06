var MoveShapeAction = function(layer, lastPosition, shapeView) {
  return {
    update: function(updatedPosition) {
      var moveBy = lastPosition.difference(updatedPosition);
      shapeView.move(moveBy.x, moveBy.y);
      shapeView.draw(layer);
      lastPosition = updatedPosition;
    }
  }
};
