var RectangleView = function(el, rectangle) {
  var classNames = ['shape'];

  var top = function(offset) {
    return rectangle.top() - offset.top;
  };

  var left = function(offset) {
    return rectangle.left() - offset.left;
  };

  var updateClassNames = function() {
    el.className = classNames.join(" ");
  };

  var updatePosition = function(offset) {
    el.style.top    = top(offset)+"px";
    el.style.left   = left(offset)+"px";
    el.style.width  = rectangle.width()+"px";
    el.style.height = rectangle.height()+"px";
  };

  var hasClass = function(name) {
    return classNames.indexOf(name) !== -1;
  };

  return {
    addClass: function(name) {
      if(!hasClass(name)) {
        classNames.push(name);
      }
    },
    removeClass: function(name) {
      var idx = classNames.indexOf(name);
      if(idx >= 0) {
        classNames.splice(idx, 1);
      }
    },
    getOrigin: function() {
      return rectangle.vertices().A;
    },
    getOffset: function(point) {
      var vertexA = this.getOrigin();
      return vertexA.difference(point.x(), point.y());
    },
    move: function(x, y) {
      rectangle.vertices().A.move(x, y);
      rectangle.vertices().C.move(x, y);
    },
    draw: function(layer) {
      updateClassNames();
      updatePosition(layer.box());
    }
  }
};
