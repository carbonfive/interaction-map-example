var Point = function(x, y) {
  var coords = {x: x, y: y};

  return {
    x: function() { return coords.x; },
    y: function() { return coords.y; },
    difference: function(other) {
      return new Point(this.x() - other.x(), this.y() - other.y());
    },
    move: function(shiftCoords) {
      coords.x += shiftCoords.x();
      coords.y += shiftCoords.y();
    }
  }
};
