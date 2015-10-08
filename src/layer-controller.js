var LayerController = function(layer) {
  var activeAction = null;

  return {
    startDrawing: function(point) {
      var rectangle   = new Rectangle(point);
      var layerShape  = layer.addShape(rectangle);
      var view        = new RectangleView(layerShape.element, layerShape.model);
      view.addClass('drawing');
      activeAction  = new DrawAction(layer, rectangle, view);
    },
    updateDrawing: function(point) {
      activeAction.update(point);
    },
    abortDrawing: function() {
      activeAction.abort();
    },
    endDrawing: function() {
      activeAction.view().removeClass('drawing');
      activeAction.draw();
      activeAction = null;
    },

    startMove: function(point) {
      var layerObj  = layer.topObjectContaining(point);
      var shapeView = new RectangleView(layerObj.element, layerObj.model);
      activeAction  = new MoveShapeAction(layer, point, shapeView);
    },
    move: function(point) {
      activeAction.update(point);
    },
    endMove: function() {
      activeAction = null;
    },

    startResize: function(point) {
      var layerObj  = layer.topObjectContaining(point);
      var shapeView = new RectangleView(layerObj.element, layerObj.model);
      activeAction  = new ResizeShapeAction(layer, point, layerObj.model, shapeView);
    },
    updateResize: function(point) {
      activeAction.update(point);
    },
    endResize: function() {
      activeAction = null;
    },

    isOverShape: function(point) {
      return layer.objectsContaining(point).length > 0;
    },
    activeEdges: function(point) {
      var layerObj  = layer.topObjectContaining(point);
      var shapeView = new RectangleView(layerObj.element, layerObj.model);
      return shapeView.getActiveEdges(point);
    }
  }
};
