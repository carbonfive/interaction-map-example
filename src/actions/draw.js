var DrawAction = function(layer, shape, view) {
  view.addClass("drawing");

  return {
    update: function(vertexC) {
      shape.update(shape.origin(), vertexC);
      view.draw(layer);
    },
    complete: function() {
      view.removeClass("drawing");
      view.draw(layer);
    }
  }
};
