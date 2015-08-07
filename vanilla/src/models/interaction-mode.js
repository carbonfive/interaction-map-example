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

  var getTransition = function(eventName) {
    var val = transitions[eventName];
    if(typeof val === 'function') {
      return val;
    }
    else {
      return function(){ return val };
    }
  };

  var callTransition = function(eventName, event, actor) {
    return getTransition(eventName)(event, actor);
  };

  var hasHandler = function(eventName) {
    return !!handlers[eventName];
  };

  var getHandler = function(eventName) {
    return handlers[eventName];
  };

  var callHandler = function(eventName, event, actor) {
    return getHandler(eventName)(event, actor);
  };

  return {
    name: name,
    transition: function (eventName, event, actor) {
      if(hasTransition(eventName)) {
        return callTransition(eventName, event, actor);
      }
    },
    handle: function(eventName, event, actor) {
      if(hasHandler(eventName)) {
        return callHandler(eventName, event, actor);
      }
    }
  }
};
