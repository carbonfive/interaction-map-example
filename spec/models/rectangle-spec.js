describe("Rectangle", function() {
  describe("constructor", function() {
    it("accepts two points for the A and C verticies", function() {
      var a = new Point(0,0);
      var c = new Point(20,20);
      var rectangle = new Rectangle(a,c);
      expect(rectangle.vertices().A.equals(a)).toBeTruthy();
      expect(rectangle.vertices().C.equals(c)).toBeTruthy();
    });
  });
  describe("width", function() {
    it("returns the calculated width", function() {
      var rectangle = new Rectangle(new Point(0,0), new Point(10, 20));
      expect(rectangle.width()).toEqual(10);
    });
    it("returns a positive value when vertexC.x is less than vertexA.x", function() {
      var rectangle = new Rectangle(new Point(0,0), new Point(-10, 20));
      expect(rectangle.width()).toEqual(10);
    });
  });
  describe("height", function() {
    it("returns the calculated height", function() {
      var rectangle = new Rectangle(new Point(0,0), new Point(10, 20));
      expect(rectangle.height()).toEqual(20);
    });
    it("returns a positive value when vertexC.y is less than vertexA.y", function() {
      var rectangle = new Rectangle(new Point(0,0), new Point(10, -20));
      expect(rectangle.height()).toEqual(20);
    });
  });
  describe("top", function() {
    it("returns the y coordinate of the vertex with the lowest y value", function() {
      var a = new Point(0,0);
      var c = new Point(10,10);
      var rectangle = new Rectangle(a,c);
      expect(rectangle.top()).toEqual(a.y());

      var a2 = new Point(10,10);
      var c2 = new Point(0, 0);
      var rectangle2 = new Rectangle(a2,c2);
      expect(rectangle2.top()).toEqual(c2.y());
    });
  });
  describe("left", function() {
    it("returns the x coordinate of the vertex with the lowest x value", function() {
      var a = new Point(0,0);
      var c = new Point(10,10);
      var rectangle = new Rectangle(a,c);
      expect(rectangle.left()).toEqual(a.x());

      var a2 = new Point(10,10);
      var c2 = new Point(0, 0);
      var rectangle2 = new Rectangle(a2,c2);
      expect(rectangle2.left()).toEqual(c2.x());
    });
  });
  describe("bottom", function() {
    it("returns the y coordinate of bottom edge of the rectangle", function() {
      var a = new Point(0,0);
      var c = new Point(10,10);
      var rectangle = new Rectangle(a,c);
      expect(rectangle.bottom()).toEqual(c.y());

      var a2 = new Point(10,10);
      var c2 = new Point(0, 0);
      var rectangle2 = new Rectangle(a2,c2);
      expect(rectangle2.bottom()).toEqual(a2.y());
    });
  });
  describe("right", function() {
    it("returns the x coordinate of right edge of the rectangle", function() {
      var a = new Point(0,0);
      var c = new Point(10,10);
      var rectangle = new Rectangle(a,c);
      expect(rectangle.right()).toEqual(c.x());

      var a2 = new Point(10,10);
      var c2 = new Point(0, 0);
      var rectangle2 = new Rectangle(a2,c2);
      expect(rectangle2.right()).toEqual(a2.x());
    });
  });
  describe("contains", function() {
    it("returns true when the given point is contained by the rectangle", function() {
      var point = new Point(5,5);
      var rectangle = new Rectangle(new Point(0,0), new Point(10,10));
      expect(rectangle.contains(point)).toBeTruthy();
    });
    it("returns true when the given point falls on the border of the rectangle", function() {
      var point = new Point(0,10);
      var rectangle = new Rectangle(new Point(0,0), new Point(10,10));
      expect(rectangle.contains(point)).toBeTruthy();
    });
    it("returns false when the given point is not contained by the rectangle", function() {
      var point = new Point(11,11);
      var rectangle = new Rectangle(new Point(0,0), new Point(10,10));
      expect(rectangle.contains(point)).toBeFalsy();
    });
  });
  describe("update", function() {
    it("updates vertexA and vertexC with the given values", function() {
      var rectangle = new Rectangle(new Point(0,0), new Point(10,10));
      var updatedA = new Point(5,5);
      var updatedC = new Point(15,15);
      rectangle.update(updatedA, updatedC);
      expect(rectangle.vertices().A.equals(updatedA)).toBeTruthy();
      expect(rectangle.vertices().C.equals(updatedC)).toBeTruthy();
    });
  });
  describe("vertices", function() {
    it("returns vertices A through D of the rectangle", function() {
      var a = new Point(0,  0);
      var b = new Point(10, 0);
      var c = new Point(10,10);
      var d = new Point(0, 10);
      var rectangle = new Rectangle(a,c);
      var vertices = rectangle.vertices();
      expect(vertices.A.equals(a)).toBeTruthy();
      expect(vertices.B.equals(b)).toBeTruthy();
      expect(vertices.C.equals(c)).toBeTruthy();
      expect(vertices.D.equals(d)).toBeTruthy();
    });
    it("returns the expected values for negative numbers", function() {
      var a = new Point(10,  10);
      var b = new Point(-10, 10);
      var c = new Point(-10,-10);
      var d = new Point(10, -10);
      var rectangle = new Rectangle(a,c);
      var vertices = rectangle.vertices();
      expect(vertices.A.equals(a)).toBeTruthy();
      expect(vertices.B.equals(b)).toBeTruthy();
      expect(vertices.C.equals(c)).toBeTruthy();
      expect(vertices.D.equals(d)).toBeTruthy();
    });
  });
});
