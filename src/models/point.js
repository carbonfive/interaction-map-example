var Point = function(x, y) {
  return {
    x: function() { return x; },
    y: function() { return y; },
    coords: function() {
      return [x, y];
    },
    difference: function(point) {
      return {x: point.x() - x, y: point.y() - y};
    },
    move: function(xO, yO) {
      x += xO;
      y += yO;
    },
    equals: function(other){
      return(x === other.x() && y === other.y());
    }
  }
};
