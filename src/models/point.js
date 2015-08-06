var Point = function(x, y) {
  return {
    x: function() { return x; },
    y: function() { return y; },
    coords: function() {
      return [x, y];
    },
    difference: function(xO, yO) {
      return [xO - x, yO - y];
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
