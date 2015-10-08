SIGNAL_MODE_GRID = [
  ['signal-resize-nwse',       'signal-resize-vertical', 'signal-resize-nesw'],
  ['signal-resize-horizontal', 'signal-move',            'signal-resize-horizontal'],
  ['signal-resize-nesw',       'signal-resize-vertical', 'signal-resize-nwse']
];

var getShapeMode = function(point, controller) {
  var activeEdges = controller.activeEdges(point);
  var grid = new ActiveGrid(activeEdges);
  return grid.activeCell(SIGNAL_MODE_GRID);
};

var getSignalMode = function (event, controller) {
  var point = new Point(event.clientX, event.clientY);
  if(controller.isOverShape(point)) {
    return getShapeMode(point, controller);
  } else {
    return "signal-draw";
  }
};

var modes = [
  new InteractionMode("inactive", {
    transitions: {
      mousemove: getSignalMode
    }
  }),
  new InteractionMode("signal-draw", {
    transitions: {
      mousedown: "start-draw",
      mousemove: getSignalMode
    }
  }),
  new InteractionMode("start-draw", {
    transitions: {
      mousemove: "draw",
      mouseup:   "abort-draw"
    },
    handlers: {
      mousedown: function(event, controller) {
        controller.startDrawing(new Point(event.clientX, event.clientY));
      }
    }
  }),
  new InteractionMode("draw", {
    transitions: {
      mouseup: "end-draw"
    },
    handlers: {
      mousemove: function(event, controller) {
        controller.updateDrawing(new Point(event.clientX, event.clientY));
      }
    }
  }),
  new InteractionMode("abort-draw", {
    transitions: {
      mousemove: getSignalMode
    },
    handlers: {
      mouseup: function(event, controller) {
        controller.abortDrawing();
      }
    }
  }),
  new InteractionMode("end-draw", {
    transitions: {
      mousemove: getSignalMode
    },
    handlers: {
      mouseup: function(event, controller) {
        controller.endDrawing(new Point(event.clientX, event.clientY));
      }
    }
  }),
  new InteractionMode("signal-move", {
    transitions: {
      mousedown: "start-move",
      mousemove: getSignalMode
    }
  }),
  new InteractionMode("start-move", {
    transitions: {
      mousemove: "move",
      mouseup:   "signal-move"
    },
    handlers: {
      mousedown: function(event, controller) {
        controller.startMove(new Point(event.clientX, event.clientY));
      }
    }
  }),
  new InteractionMode("move", {
    transitions: {
      mouseup: "end-move"
    },
    handlers: {
      mousemove: function(event, controller) {
        controller.move(new Point(event.clientX, event.clientY));
      }
    }
  }),
  new InteractionMode("end-move", {
    transitions: {
      mousedown: "start-move",
      mousemove: getSignalMode
    },
    handlers: {
      mouseup: function(event, controller) {
        controller.endMove(event);
      }
    }
  }),
  new InteractionMode("signal-resize-nwse", {
    transitions: {
      mousedown: "start-resize",
      mousemove: getSignalMode
    }
  }),
  new InteractionMode("signal-resize-nesw", {
    transitions: {
      mousedown: "start-resize",
      mousemove: getSignalMode
    }
  }),
  new InteractionMode("signal-resize-horizontal", {
    transitions: {
      mousedown: "start-resize",
      mousemove: getSignalMode
    }
  }),
  new InteractionMode("signal-resize-vertical", {
    transitions: {
      mousedown: "start-resize",
      mousemove: getSignalMode
    }
  }),
  new InteractionMode("start-resize", {
    transitions: {
      mousemove: "resize",
      mouseup: getSignalMode
    },
    handlers: {
      mousedown: function(event, controller) {
        controller.startResize(new Point(event.clientX, event.clientY));
      }
    }
  }),
  new InteractionMode("resize", {
    transitions: {
      mouseup: "end-resize"
    },
    handlers: {
      mousemove: function(event, controller) {
        controller.updateResize(new Point(event.clientX, event.clientY));
      }
    }
  }),
  new InteractionMode("end-resize", {
    transitions: {
      mousedown: 'start-resize',
      mousemove: getSignalMode
    },
    handlers: {
      mouseup: function(event, controller) {
        controller.endResize()
      }
    }
  })
];
