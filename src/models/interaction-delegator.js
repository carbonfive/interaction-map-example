var InteractionDelegator = function(interactionMap) {
  var observers = {};

  var notifyObservers = function(modeName) {
    for(var observerName in observers) {
      if(observers.hasOwnProperty(observerName)) {
        observers[observerName](modeName);
      }
    }
  };

  this.addObserver = function(name, fn) {
    observers[name] = fn;
  };

  this.delegate = function(eventName, event, actor) {
    if(interactionMap.transition(eventName, event, actor)) {
      notifyObservers(interactionMap.getEnabled().name);
    }
    interactionMap.handle(eventName, event, actor);
  };

  this.removeObserver = function(name) {
    delete observers[name];
  };
};
