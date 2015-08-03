var InteractionMode = function(name, definition) {
  var handlers, transitions;

  if(definition === undefined || definition.handlers === undefined) {
    handlers = {};
  }
  else {
    handlers = definition.handlers;
  }

  if(definition === undefined || definition.transitions === undefined) {
    transitions = {};
  }
  else {
    transitions = definition.transitions;
  }

  var hasTransition = function(eventName) {
    return !!transitions[eventName];
  };

  var getTransitionFn = function(eventName) {
    var val = transitions[eventName];
    if(typeof val === 'function') {
      return val;
    }
    else {
      return function(){return val};
    }
  };

  var hasHandler = function(eventName) {
    return !!handlers[eventName];
  };

  var getHandler = function(eventName) {
    return handlers[eventName];
  };

  var handlerUndefinedError = function(eventName) {
    return new Error("InteractionMode Error: The mode '" + name + "' was asked to handle the '" + eventName + "' event " +
      "but there is no handler registered for the '" + eventName + "' event.");
  };

  return {
    transition: function (eventName, event, actor) {
      if(hasTransition(eventName)) {
        return getTransitionFn(eventName)(event, actor);
      }
      else {
        return null;
      }
    },
    handle: function(eventName, event, actor) {
      if(hasHandler(eventName)) {
        return getHandler(eventName)(event, actor);
      }
      else {
        throw handlerUndefinedError(eventName);
      }
    }
  }
};
