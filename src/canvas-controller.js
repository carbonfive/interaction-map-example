var CanvasController = function(canvas) {

  var shapesContaining = function(point, shapes) {
    return shapes.reduce(function(memo, shape) {
      if(shape.contains(point)) {
        memo.push(shape);
      }
      return memo;
    },[]);
  };

  var topShapeContaining = function(point, shapes) {
    return shapesContaining(point, shapes).sort(function(a,b){
      return b.getStackOrder() - a.getStackOrder();
    })[0];
  };

  var MoveAction = function(moveOrigin, rectangles) {
    var difference = function(origin, point) {
      return {x: point.x - origin.x, y: point.y - origin.y};
    };

    var shape = topShapeContaining(moveOrigin, rectangles);
    var offset = difference(shape.getOrigin(), moveOrigin);

    return {
      update: function(point) {
        var diff = difference(shape.getOrigin(), point);
        var newOrigin = {x: diff.x - offset.x, y: diff.y - offset.y};
        shape.moveByOrigin(newOrigin);
        shape.draw();
      }
    }
  };

  var activeAction = null;
  var shapes = [];

  return {
    startDrawing: function(point) {
      activeAction = new Rectangle(point, canvas, shapes.length + 10);
    },
    updateDrawing: function(point) {
      activeAction.updateTerminus(point);
      activeAction.draw();
    },
    endDrawing: function() {
      activeAction.removeClass('drawing');
      activeAction.draw();
      shapes.push(activeAction);
      activeAction = null;
    },
    startMove: function(point) {
      activeAction = new MoveAction(point, shapes);
    },
    move: function(point) {
      activeAction.update(point);
    },
    endMove: function() {
      activeAction = null;
    },
    isOverShape: function(point) {
      return shapesContaining(point, shapes).length > 0;
    }
  }
};
