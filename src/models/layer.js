var Layer = function(shapes) {
  if(typeof shapes === 'undefined') {
    shapes = [];
  }

  return {
    addShape: function(shape) {
      shapes.push(shape);
    },
    shapes: function() {
      return shapes;
    },
    shapesContaining: function(point) {
      return shapes.filter(function(shape) {
        return shape.contains(point);
      });
    },
    topShapeContaining: function(point) {
      return this.shapesContaining(point).sort(function(a,b){
        return b.getStackOrder() - a.getStackOrder();
      })[0];
    }
  }
};
