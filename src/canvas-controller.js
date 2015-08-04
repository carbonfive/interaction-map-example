var CanvasController = function(canvas) {
  var activeAction = null;
  var layer = new Layer();

  return {
    startDrawing: function(point) {
      activeAction = new DrawRectangleAction(point, canvas, layer.shapes().length + 10);
    },
    updateDrawing: function(point) {
      activeAction.update(point);
      activeAction.draw();
    },
    abortDrawing: function() {
      activeAction.abort();
    },
    endDrawing: function() {
      activeAction.removeClass('drawing');
      activeAction.draw();
      layer.addShape(activeAction.node());
      activeAction = null;
    },
    startMove: function(point) {
      var shape = layer.topShapeContaining(point);
      activeAction = new MoveShapeAction(point, shape);
    },
    move: function(point) {
      activeAction.update(point);
    },
    endMove: function() {
      activeAction = null;
    },
    isOverShape: function(point) {
      return layer.shapesContaining(point).length > 0;
    }
  }
};
