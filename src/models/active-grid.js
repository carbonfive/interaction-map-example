ActiveGrid = function(edges) {
  var top = edges.top,
    right = edges.right,
    bottom = edges.bottom,
    left = edges.left;

  grid = [
    [ top && !right && !bottom && left,  top && !right && !bottom && !left,  top && right && !bottom && !left],
    [!top && !right && !bottom && left, !top && !right && !bottom && !left, !top && right && !bottom && !left],
    [!top && !right &&  bottom && left, !top && !right &&  bottom && !left, !top && right &&  bottom && !left]
  ];

  coords = function () {
    var activeCoords = [];
    grid.forEach(function (rowColumns, rowIndex) {
      rowColumns.forEach(function (gridCell, columnIndex) {
        if (!!gridCell) {
          activeCoords.push({row: rowIndex, column: columnIndex});
        }
      });
    });
    return activeCoords;
  };

  return {
    isAmbiguous: function () {
      return coords().length !== 1;
    },
    activeCell: function (modeGrid) {
      if (this.isAmbiguous()) {
        throw new Error("ActiveGrid: The given edges produce an ambiguous result");
      }
      cell = coords()[0];
      return modeGrid[cell.row][cell.column]
    }
  }
};
