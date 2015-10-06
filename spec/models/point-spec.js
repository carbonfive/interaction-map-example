describe('point', function() {
  describe('constructor', function() {
    it("takes x and y coords", function() {
      var point = new Point(5,10);
      expect(point.x()).toEqual(5);
      expect(point.y()).toEqual(10);
    });
  });
  describe('difference', function() {
    it("returns a two item array containing the x and y difference", function() {
      var pointA = new Point(20,20);
      var pointB = new Point(15,25);
      var diff = pointA.difference(pointB);
      expect(diff.x).toEqual(-5);
      expect(diff.y).toEqual(5);
    });
  });
  describe('move', function() {
    it("moves the point by the amounts given", function() {
      var point = new Point(10,10);
      point.move(4, 12);
      expect(point.x()).toEqual(14);
      expect(point.y()).toEqual(22);
    });
  });
  describe('equals', function() {
    it("returns true if the x and y coords are equal", function() {
      var a = new Point(5,5);
      var b = new Point(5,5);
      expect(a.equals(b)).toBeTruthy();
    });
    it("returns false if the x and y coords are different", function() {
      var a = new Point(5,5);
      var b = new Point(5,10);
      expect(a.equals(b)).toBeFalsy();
    });
  });
});
