var DrawRectangleAction = function(vertexA, parentNode, stackOrder) {
  var vertexC = new Point(vertexA.x, vertexA.y);
  var rectangle = new Rectangle(vertexA, vertexC);
  var rectangleNode = new RectangleNode(rectangle, parentNode, stackOrder);

  parentNode.appendChild(rectangleNode.el());

  return {
    update: function(vertexC) {
      rectangle.update(vertexA, vertexC);
    },
    draw: function() {
      rectangleNode.draw();
    },
    removeClass: function(name) {
      rectangleNode.removeClass(name);
    },
    node: function() {
      return rectangleNode;
    }
  }
};
