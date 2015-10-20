var LayerController = function(layer) {
  var activeAction = null;

  return {
    startDrawing: function(point) {
      var rectangle  = new Rectangle(point);
      var layerShape = layer.addShape(rectangle);
      var view       = new RectangleView(layerShape.element, layerShape.model);
      activeAction   = new DrawAction(layer, rectangle, view);
    },
    updateDrawing: function(point) {
      activeAction.update(point);
    },
    abortDrawing: function() {
      activeAction.abort();
    },
    endDrawing: function() {
      activeAction.complete();
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
      activeAction  = new ResizeShapeAction(layer, point, shapeView);
    },
    updateResize: function(point) {
      activeAction.update(point);
    },
    endResize: function() {
      activeAction = null;
    },

    startExpand: function(point) {
      var layerObj  = layer.topObjectContaining(point);
      var shapeView = new RectangleView(layerObj.element, layerObj.model);
      activeAction  = new ExpandShapeAction(layer, point, shapeView);
    },
    updateExpand: function(point) {
      activeAction.update(point);
    },
    endExpand: function() {
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
