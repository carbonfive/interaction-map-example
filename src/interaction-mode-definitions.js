var getSignalMode = function (event, actor) {
  if(actor.isOverShape(new Point(event.clientX, event.clientY))) {
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
        actor.startDrawing(new Point(event.clientX, event.clientY));
      }
    }
  }),

  new InteractionMode("draw", {
    transitions: {
      mouseup: "end-draw"
    },
    handlers: {
      mousemove: function(event, actor) {
        actor.updateDrawing(new Point(event.clientX, event.clientY));
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
        actor.endDrawing(new Point(event.clientX, event.clientY));
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
        actor.startMove(new Point(event.clientX, event.clientY));
      }
    }
  }),

  new InteractionMode("move", {
    transitions: {
      mouseup: "end-move"
    },
    handlers: {
      mousemove: function(event, actor) {
        actor.move(new Point(event.clientX, event.clientY));
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
