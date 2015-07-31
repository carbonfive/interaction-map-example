var getSignalMode = function (actor, event) {
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
      mousedown: function(event, actor) {
        actor.startDrawing({x: event.clientX, y: event.clientY});
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
      mousemove: function(event, actor) {
        actor.updateDrawing({x: event.clientX, y: event.clientY});
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
      mouseup: function(event, actor) { actor.endDrawing({x: event.clientX, y: event.clientY}); }
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
