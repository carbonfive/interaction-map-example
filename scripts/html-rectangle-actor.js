var HTMLRectangleActor = function(canvas) {
  return {
    startDrawing: function(point) {
      console.log('startDrawing', point);
    },
    updateDrawing: function(point) {
      console.log('updateDrawing', point);
    },
    endDrawing: function(point) {
      console.log('endDrawing', point);
    }
  }
};
