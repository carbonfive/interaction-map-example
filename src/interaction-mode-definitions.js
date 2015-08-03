var getSignalMode = function (event, controller) {
  if(controller.isOverShape({x: event.clientX, y: event.clientY})) {
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
      mousedown: function () { return "start-draw"; },
      mousemove: getSignalMode
    }
  }),
  {
    name: "start-draw",
    handlers: {
      mousedown: function(event, controller) {
        controller.startDrawing({x: event.clientX, y: event.clientY});
      }
    },
    transitions: {
      mousemove: function() { return "draw"; },
      mouseup: function() { return "signal-draw"; }
    }
  },
  {
    name: "draw",
    handlers: {
      mousemove: function(event, controller) {
        controller.updateDrawing({x: event.clientX, y: event.clientY});
      }
    },
    transitions: {
      mouseup: function() {
        return "end-draw";
      }
    }
  },
  {
    name: "end-draw",
    handlers: {
      mouseup: function(event, controller) { controller.endDrawing({x: event.clientX, y: event.clientY}); }
    },
    transitions: {
      mousemove: getSignalMode
    }
  },

  {
    name: "signal-move",
    transitions: {
      mousedown: function() { return "start-move"; },
      mousemove: getSignalMode
    }
  },
  {
    name: "start-move",
    handlers: {
      mousedown: function(event, controller) {
        controller.startMove({x: event.clientX, y: event.clientY});
      }
    },
    transitions: {
      mousemove: function() { return "move"; },
      mouseup: function() { return "signal-move"; }
    }
  },
  {
    name: "move",
    handlers: {
      mousemove: function(event, controller) {
        controller.move({x: event.clientX, y: event.clientY});
      }
    },
    transitions: {
      mouseup: function() {
        return "end-move";
      }
    }
  },
  {
    name: "end-move",
    handlers: {
      mouseup: function(event, controller) {
        controller.endMove(event);
      }
    },
    transitions: {
      mousedown: function() { return "start-move"; },
      mousemove: getSignalMode
    }
  }
];
