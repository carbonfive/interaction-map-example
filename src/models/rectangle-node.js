var RectangleNode = function(rectangle, parentNode, stackOrder) {
  var offset = parentNode.getBoundingClientRect();
  var classNames = ['shape', 'drawing'];
  var el = document.createElement('div');

  var id = "shape-"+performance.now().toString().replace(".",'-');
  el.setAttribute('id', id);
  el.style.zIndex = stackOrder;

  var top = function() {
    return rectangle.top() - offset.top;
  };

  var left = function() {
    return rectangle.left() - offset.left;
  };

  return {
    el: function() {
      return el;
    },
    updatePosition: function() {
      el.style.top = top()+"px";
      el.style.left = left()+"px";
      el.style.width = rectangle.width()+"px";
      el.style.height = rectangle.height()+"px";
    },
    updateClassNames: function() {
      el.className = classNames.join(" ");
    },
    removeClass: function(name) {
      var idx = classNames.indexOf(name);
      classNames.splice(idx, 1);
    },
    contains: function(point) {
      return rectangle.contains(point);
    },
    getStackOrder: function() {
      return stackOrder;
    },
    getOrigin: function() {
      return rectangle.vertecies().A;
    },
    move: function(coords) {
      rectangle.vertecies().A.move(coords);
      rectangle.vertecies().C.move(coords);
    },
    draw: function() {
      this.updateClassNames();
      this.updatePosition();
    }
  }
};
