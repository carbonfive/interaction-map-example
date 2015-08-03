var getSignalMode = function (event, actor) {
  if(actor.isOverShape({x: event.clientX, y: event.clientY})) {
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
      mouseup:   "signal-draw"
    },
    handlers: {
      mousedown: function(event, actor) {
        actor.startDrawing({x: event.clientX, y: event.clientY});
      }
    }
  }),
  new InteractionMode("draw", {
    transitions: {
      mouseup: "end-draw"
    },
    handlers: {
      mousemove: function(event, actor) {
        actor.updateDrawing({x: event.clientX, y: event.clientY});
      }
    }
  }),
  new InteractionMode("end-draw", {
    transitions: {
      mousemove: getSignalMode
    },
    handlers: {
      mouseup: function(event, actor) {
        actor.endDrawing({x: event.clientX, y: event.clientY});
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
        actor.startMove({x: event.clientX, y: event.clientY});
      }
    }
  }),
  new InteractionMode("move", {
    transitions: {
      mouseup: "end-move"
    },
    handlers: {
      mousemove: function(event, actor) {
        actor.move({x: event.clientX, y: event.clientY});
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
