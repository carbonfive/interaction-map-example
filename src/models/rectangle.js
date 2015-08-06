var Rectangle = function(vertexA, vertexC) {
  if(typeof vertexA === 'undefined') {
    vertexA = new Point();
  }

  if(typeof vertexC === 'undefined') {
    vertexC = new Point();
  }

  var topVertex = function() {
    return vertexA.y() <= vertexC.y() ? vertexA : vertexC;
  };

  var leftVertex = function() {
    return vertexA.x() <= vertexC.x() ? vertexA : vertexC;
  };

  return {
    width: function() {
      return Math.abs(vertexC.x() - vertexA.x());
    },
    height: function() {
      return Math.abs(vertexC.y() - vertexA.y());
    },
    top: function() {
      return topVertex().y();
    },
    left: function() {
      return leftVertex().x();
    },
    bottom: function() {
      return this.top() + this.height();
    },
    right: function() {
      return this.left() + this.width();
    },
    contains: function(point) {
      return this.top() <= point.y() && point.y() <= this.bottom() && this.left() <= point.x() && point.x() <= this.right();
    },
    update: function(A, C) {
      vertexA = A;
      vertexC = C;
    },
    origin: function() {
      return vertexA;
    },
    vertices: function() {
      var vertexB = new Point(vertexC.x(), vertexA.y());
      var vertexD = new Point(vertexA.x(), vertexC.y());
      return {
        A: vertexA, B: vertexB, C: vertexC, D: vertexD
      }
    }
  }
};
