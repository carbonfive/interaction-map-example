var InteractionMap = function() {
  var observers = {};
  var modes = {};
  var enabled;

  var notifyObservers = function(modeName) {
    for(var observerName in observers) {
      if(observers.hasOwnProperty(observerName)) {
        observers[observerName](modeName);
      }
    }
  };

  var isRegistered = function(modeName) {
    return !!modes[modeName];
  };

  return {
    register: function(interactionMode) {
      modes[interactionMode.name] = interactionMode;
    },
    registerAll: function(interactionModes) {
      interactionModes.forEach(function(mode){
        this.register(mode);
      }, this);
    },
    delegate: function(event, actor) {
      var transitionTo = enabled.transition(event.type, event, actor);
      if(transitionTo) { this.enable(transitionTo) }
      enabled.handle(event.type, event, actor);
    },
    enable: function(modeName) {
      if(isRegistered(modeName)) {
        if(enabled && modeName === enabled.name) { return; }
        enabled = modes[modeName];
        notifyObservers(modeName);
      } else {
        throw new Error('InteractionMap: Attempted to enable undefined mode "'+modeName+'".');
      }
    },
    enabled: function() {
      return enabled;
    },
    addObserver: function(name, fn) {
      observers[name] = fn;
    },
    removeObserver: function(name) {
      delete observers[name];
    },
    modes: function() {
      return modes;
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
