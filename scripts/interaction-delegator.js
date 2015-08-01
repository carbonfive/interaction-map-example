var InteractionDelegator = function(defaultMode) {
  var interactionModes = {};
  var current = defaultMode;
  var observers = {};

  var currentMode = function() {
    return interactionModes[current];
  };

  var transitions = function() {
    return currentMode().transitions ? currentMode().transitions : {};
  };

  var handlers = function() {
    return currentMode().handlers ? currentMode().handlers : {};
  };

  var transition = function(eventName, event, actor) {
    var transitionFn = transitions()[eventName];
    return transitionFn ? transitionFn(event, actor) : current;
  };

  var handle = function(eventName, event, actor) {
    var handlerFn = handlers()[eventName] ? handlers()[eventName] : function() {};
    return handlerFn(event, actor);
  };

  var findOrInitializeMode = function(modeName) {
    if(!interactionModes[modeName]) {
      interactionModes[modeName] = {handlers: {}, transitions: {}};
    }
    return interactionModes[modeName];
  };

  var notifyObservers = function(modeName) {
    for(var observerName in observers) {
      if(observers.hasOwnProperty(observerName)) {
        observers[observerName](modeName);
      }
    }
  };

  return {
    define: function(modeNames, definition) {
      for (var i = 0, name = modeNames[i]; i < modeNames.length; i++) {
        this.defineHandlers(name, definition.handlers);
        this.defineTransitions(name, definition.transitions);
      }
    },
    defineHandlers: function(name, handlerDefinitions) {
      var mode = findOrInitializeMode(name);
      for(var eventName in handlerDefinitions) {
        if(handlerDefinitions.hasOwnProperty(eventName)) {
          mode.handlers[eventName] = handlerDefinitions[eventName];
        }
      }
    },
    defineTransitions: function(name, transitionDefinitions) {
      var mode = findOrInitializeMode(name);
      for(var eventName in transitionDefinitions) {
        if(transitionDefinitions.hasOwnProperty(eventName)) {
          mode.transitions[eventName] = transitionDefinitions[eventName];
        }
      }
    },
    delegate: function(event, actor) {
      var eventName = event.type || event.name;
      this.enable(transition(eventName, event, actor));
      handle(eventName, event, actor);
    },
    enable: function(mode) {
      if(mode === current) { return; }
      if(this.isDefined(mode)) {
        current = mode;
        notifyObservers(mode);
      } else {
        throw new Error('InteractionMap: Attempted to enable undefined mode "'+mode+'".');
      }
    },
    enabled: function() {
      return current;
    },
    isDefined: function(mode) {
      return !!interactionModes[mode];
    },
    addObserver: function(name, fn) {
      observers[name] = fn;
    },
    removeObserver: function(name) {
      delete observers[name];
    },
    debug: function(enabled) {
      if(enabled) {
        this.addObserver('debug', function(modeName) {
          console.log('Enabled mode "' + modeName +'"');
        });
      } else {
        this.removeObserver('debug');
      }
    }
  }
};
