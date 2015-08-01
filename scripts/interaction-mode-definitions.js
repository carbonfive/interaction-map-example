var getSignalMode = function (controller, event) {
  return "signal-draw";
};

var modes = [
  {
    name: "inactive",
    transitions: {
      mousemove: getSignalMode
    }
  },
  {
    name: "signal-draw",
    transitions: {
      mousedown: function() { return "start-draw"; },
      mousemove: getSignalMode
    }
  },
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
    name: "signal-move"
  },
  {
    name: "start-move"
  },
  {
    name: "move"
  },
  {
    name: "end-move"
  }
];
