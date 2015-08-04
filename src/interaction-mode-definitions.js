var getSignalMode = function (event, actor) {
  if(actor.isOverShape(new EventPoint(event))) {
    return "signal-move";
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
      mousedown: function(event, actor) {
        actor.startDrawing(new EventPoint(event));
      }
    }
  }),
  new InteractionMode("draw", {
    transitions: {
      mouseup: "end-draw"
    },
    handlers: {
      mousemove: function(event, actor) {
        actor.updateDrawing(new EventPoint(event));
      }
    }
  }),
  new InteractionMode("abort-draw", {
    transitions: {
      mousemove: getSignalMode
    },
    handlers: {
      mouseup: function(event, actor) {
        actor.abortDrawing();
      }
    }
  }),
  new InteractionMode("end-draw", {
    transitions: {
      mousemove: getSignalMode
    },
    handlers: {
      mouseup: function(event, actor) {
        actor.endDrawing(new EventPoint(event));
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
      mousedown: function(event, actor) {
        actor.startMove(new EventPoint(event));
      }
    }
  }),
  new InteractionMode("move", {
    transitions: {
      mouseup: "end-move"
    },
    handlers: {
      mousemove: function(event, actor) {
        actor.move(new EventPoint(event));
      }
    }
  }),
  new InteractionMode("end-move", {
    transitions: {
      mousedown: "start-move",
      mousemove: getSignalMode
    },
    handlers: {
      mouseup: function(event, actor) {
        actor.endMove(event);
      }
    }
  })
];
