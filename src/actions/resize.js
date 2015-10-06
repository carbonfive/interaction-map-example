var ResizeShapeAction = function(layer, lastPosition, shape, view) {
  var vertices    = shape.vertices(),
      activeGrid  = new ActiveGrid(view.getActiveEdges(lastPosition));

  A_VERTEX_GRID = [
    [{x: true, y: true }, {x: false, y: true },  {x: false, y: true }],
    [{x: true, y: false}, {x: false, y: false},  {x: false, y: false}],
    [{x: true, y: false}, {x: false, y: false},  {x: false, y: false}]
  ];

  C_VERTEX_GRID = [
    [{x: false, y: false}, {x: false, y: false},   {x: true,  y: false}],
    [{x: false, y: false}, {x: false, y: false},   {x: true,  y: false}],
    [{x: false, y: true }, {x: false, y: true },   {x: true,  y: true }]
  ];

  var getChange = function(position, moveCoords) {
    var diff  = lastPosition.difference(position),
        x     = moveCoords.x ? diff.x : 0,
        y     = moveCoords.y ? diff.y : 0;
    return [x,y];
  };

  var updateVertex = function(vertex, moveCoords, position) {
    var change  = getChange(position, moveCoords);
    vertex.move(change[0], change[1]);
  };

  return {
    update: function(position) {
      updateVertex(vertices.A, activeGrid.activeCell(A_VERTEX_GRID), position);
      updateVertex(vertices.C, activeGrid.activeCell(C_VERTEX_GRID), position);
      view.draw(layer);
      lastPosition = position;
    }
  }
};
