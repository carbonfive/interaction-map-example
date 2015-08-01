var HTMLRectangleController = function(canvas) {

  var Rectangle = function(origin, parentNode) {
    var terminus = null;
    var bodyRect = document.body.getBoundingClientRect();
    var parentRect = parentNode.getBoundingClientRect();
    var offset = {
      y: parentRect.top - bodyRect.top,
      x: parentRect.left - bodyRect.left
    };

    var el = document.createElement('div');
    var id = "shape-"+Date.now();
    el.setAttribute('id', id);
    parentNode.appendChild(el);

    var classNames = ['shape', 'drawing'];

    var updateClassNames = function() {
      el.className = classNames.join(" ");
    };

    var width = function() {
      return terminus.x - origin.x;
    };

    var height = function() {
      return terminus.y - origin.y;
    };

    var top = function() {
      return origin.y - offset.y;
    };

    var left = function() {
      return origin.x - offset.x;
    };

    var updatePosition = function() {
      el.style.top = top()+"px";
      el.style.left = left()+"px";
      el.style.width = width()+"px";
      el.style.height = height()+"px";
    };

    return {
      updateTerminus: function(point) {
        terminus = point;
      },
      draw: function() {
        updateClassNames();
        updatePosition();
      },
      markAsDone: function() {
        var idx = classNames.indexOf('drawing');
        classNames.splice(idx, 1);
      }
    }
  };

  var activeRectangle = null;
  var rectangles = [];

  return {
    startDrawing: function(point) {
      activeRectangle = new Rectangle(point, canvas);
    },
    updateDrawing: function(point) {
      activeRectangle.updateTerminus(point);
      activeRectangle.draw();
    },
    endDrawing: function(point) {
      activeRectangle.markAsDone();
      activeRectangle.draw();
      rectangles.push(activeRectangle);
      activeRectangle = null;
    }
  }
};
