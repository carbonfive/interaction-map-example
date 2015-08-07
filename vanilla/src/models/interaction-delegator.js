var InteractionDelegator = function(interactionMap) {
  var observers = {};

  var notifyObservers = function(modeName) {
    for(var observerName in observers) {
      if(observers.hasOwnProperty(observerName)) {
        observers[observerName](modeName);
      }
    }
  };

  return {
    addObserver: function (name, fn) {
      observers[name] = fn;
    },
    delegate: function (eventName, event, actor) {
      if (interactionMap.transition(eventName, event, actor)) {
        notifyObservers(interactionMap.getEnabled().name);
      }
      interactionMap.handle(eventName, event, actor);
    },
    removeObserver: function (name) {
      delete observers[name];
    }
  }
};
