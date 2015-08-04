var Point = function(x, y) {
  var coords = {x: x, y: y};

  return {
    x: function() { return coords.x; },
    y: function() { return coords.y; },
    difference: function(other) {
      return Point.compare(this, other);
    },
    move: function(shiftCoords) {
      coords.x += shiftCoords.x();
      coords.y += shiftCoords.y();
    }
  }
};

var EventPoint = function(event) {
  var x = event.clientX;
  var y = event.clientY;
  return new Point(x,y);
};

Point.compare = function(a, b) {
  return new Point(a.x() - b.x(), a.y() - b.y());
};
