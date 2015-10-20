var ExpandShapeAction = function(layer, lastPosition, view) {
  var vertices    = view.shape.vertices();

  var getChange = function(position) {
    var diff  = lastPosition.difference(position);
    return [diff.x, diff.y];
  };

  var updateVertex = function(vertex, position, negate) {
    var change  = getChange(position);
    if(negate) {
      change[0] = -change[0];
      change[1] = -change[1];
    }
    vertex.move(change[0], change[1]);
  };

  return {
    update: function(position) {
      updateVertex(vertices.A, position);
      updateVertex(vertices.C, position, true);
      view.draw(layer);
      lastPosition = position;
    }
  }
};
