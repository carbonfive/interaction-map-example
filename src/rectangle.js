var Rectangle = function(origin, parentNode, stackOrder) {
  var terminus = null;
  var offset = parentNode.getBoundingClientRect();

  var el = document.createElement('div');
  var id = "shape-"+performance.now().toString().replace(".",'-');
  el.setAttribute('id', id);
  el.style.zIndex = stackOrder;
  parentNode.appendChild(el);

  var classNames = ['shape', 'drawing'];

  var updateClassNames = function() {
    el.className = classNames.join(" ");
  };

  var width = function() {
    return Math.abs(terminus.x - origin.x);
  };

  var height = function() {
    return Math.abs(terminus.y - origin.y);
  };

  var top = function() {
    var point = origin.y <= terminus.y ? origin : terminus;
    return point.y - offset.top;
  };

  var left = function() {
    var point = origin.x <= terminus.x ? origin : terminus;
    return point.x - offset.left;
  };

  var boundingBox = function() {
    return el.getBoundingClientRect();
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
    removeClass: function(name) {
      var idx = classNames.indexOf(name);
      classNames.splice(idx, 1);
    },
    moveByOrigin: function(coords) {
      origin.x = origin.x + coords.x;
      origin.y = origin.y + coords.y;
      terminus.x = terminus.x + coords.x;
      terminus.y = terminus.y + coords.y;
    },
    getOrigin: function() {
      return origin;
    },
    getStackOrder: function() {
      return stackOrder;
    },
    contains: function(point) {
      var box = boundingBox();
      return box.top <= point.y && point.y <= box.bottom && box.left <= point.x && point.x <= box.right;
    }
  }
};
