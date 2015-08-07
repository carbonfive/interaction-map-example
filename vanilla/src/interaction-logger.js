var InteractionLogger = function(logger) {
  return {
    logModeChange: function(modeName) {
      logger.log('Switched to Interaction Mode "' + modeName +'"');
    }
  }
};
