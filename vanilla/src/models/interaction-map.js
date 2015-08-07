var InteractionMap = function (interactionModes) {
  var enabled;
  var modes = {};

  var register = function (interactionMode) {
    modes[interactionMode.name] = interactionMode;
  };

  var registerAll = function (interactionModes) {
    interactionModes.forEach(function (mode) {
      register(mode);
    });
  };

  if (Array.isArray(interactionModes)) {
    registerAll(interactionModes);
  }

  return {
    enable: function (modeName) {
      if (this.isRegistered(modeName)) {
        if (enabled && modeName === enabled.name) {
          return;
        }
        enabled = modes[modeName];
      } else {
        throw new Error('InteractionMap: Attempted to enable undefined mode "' + modeName + '".');
      }
    },
    getEnabled: function () {
      return enabled;
    },
    getModes: function () {
      return modes;
    },
    handle: function (eventName, event, actor) {
      enabled.handle(eventName, event, actor);
    },
    isRegistered: function (modeName) {
      return !!modes[modeName];
    },
    register: register,
    registerAll: registerAll,
    transition: function (eventName, event, actor) {
      var transitionTo = enabled.transition(eventName, event, actor);
      if (transitionTo && transitionTo !== enabled.name) {
        this.enable(transitionTo);
        return true;
      }
      return false;
    }
  };
};
