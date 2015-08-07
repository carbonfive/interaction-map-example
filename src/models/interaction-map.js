var InteractionMap = function(interactionModes) {
  var enabled;
  var modes = {};

  this.initialize = function(interactionModes) {
    if(Array.isArray(interactionModes)) {
      this.registerAll(interactionModes);
    }
  };

  this.enable = function(modeName) {
    if(this.isRegistered(modeName)) {
      if(enabled && modeName === enabled.name) { return; }
      enabled = modes[modeName];
    } else {
      throw new Error('InteractionMap: Attempted to enable undefined mode "'+modeName+'".');
    }
  };

  this.getEnabled = function() {
    return enabled;
  };

  this.getModes = function() {
    return modes;
  };

  this.handle = function(eventName, event, actor) {
    enabled.handle(eventName, event, actor);
  };

  this.isRegistered = function(modeName) {
    return !!modes[modeName];
  };

  this.register = function(interactionMode) {
    modes[interactionMode.name] = interactionMode;
  };

  this.registerAll = function(interactionModes) {
    interactionModes.forEach(function(mode){
      this.register(mode);
    },this);
  };

  this.transition = function(eventName, event, actor) {
    var transitionTo = enabled.transition(eventName, event, actor);
    if(transitionTo && transitionTo !== enabled.name) {
      this.enable(transitionTo);
      return true;
    }
    return false;
  };

  this.initialize(interactionModes);
};
