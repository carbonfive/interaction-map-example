var DrawAction = function(layer, shape, view) {
  return {
    update: function(vertexC) {
      shape.update(shape.origin(), vertexC);
      view.draw(layer);
    },
    draw: function() {
      view.draw(layer);
    },
    view: function() {
      return view;
    }
  }
};
