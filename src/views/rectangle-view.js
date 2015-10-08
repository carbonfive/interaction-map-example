var RectangleView = function(node, model) {
  var classNames = ['shape'];

  var top = function(offset) {
    return model.top() - offset.top;
  };

  var left = function(offset) {
    return model.left() - offset.left;
  };

  var updateClassNames = function() {
    node.className = classNames.join(" ");
  };

  var updatePosition = function(offset) {
    node.style.top    = top(offset)+"px";
    node.style.left   = left(offset)+"px";
    node.style.width  = model.width()+"px";
    node.style.height = model.height()+"px";
  };

  var hasClass = function(name) {
    return classNames.indexOf(name) !== -1;
  };

  var edgeTolerance = {
    top: 0.05, right: 0.05, bottom: 0.05, left: 0.05
  };

  var getEdgeDistance = function(offsetPercent) {
    return {
      top: offsetPercent[1],
      right: 1 - offsetPercent[0],
      bottom: 1 - offsetPercent[1],
      left: offsetPercent[0]
    }
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
      return model.vertices().A;
    },
    getOffset: function(point) {
      var vertexA = this.getOrigin();
      return vertexA.difference(point);
    },
    getOffsetPercent: function(point) {
      var offset = this.getOffset(point);
      return [offset.x/model.width(), offset.y/model.height()]
    },
    getActiveEdges: function(point) {
      var edgeDistance = getEdgeDistance(this.getOffsetPercent(point));
      var activeEdges = {};
      for (var key in edgeDistance) {
        if (edgeDistance.hasOwnProperty(key)) {
          activeEdges[key] = (edgeDistance[key] < edgeTolerance[key])
        }
      }
      return activeEdges;
    },
    move: function(x, y) {
      model.vertices().A.move(x, y);
      model.vertices().C.move(x, y);
    },
    draw: function(layer) {
      updateClassNames();
      updatePosition(layer.box());
    }
  }
};
