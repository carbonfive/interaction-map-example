var InteractionLogger = function(logger) {
  this.logModeChange = function(modeName) {
    logger.log('Switched to Interaction Mode "' + modeName +'"');
  };
};
