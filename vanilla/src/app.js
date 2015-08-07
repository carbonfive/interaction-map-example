var interactionMap = new InteractionMap(modes);
interactionMap.enable('inactive');

var interactionDelegator = new InteractionDelegator(interactionMap);

// set the class on the body to the name of the enabled InteractionMode for mode-specific styling
interactionDelegator.addObserver('bodyClassName', function(modeName) {
  document.body.className = modeName;
});

// print the InteractionMode changes to the console
var consoleLogger = new InteractionLogger(console);
interactionDelegator.addObserver('console', consoleLogger.logModeChange);

// wire everything up on page load
window.addEventListener('load', function() {
  var canvas = document.getElementById('canvas');
  var layer = new Layer('base', canvas, 10);
  var layerController = new LayerController(layer);

  events = ["mousemove", "mousedown", "mouseup"].forEach(function(event) {
    canvas.addEventListener(event, function(event) {
      interactionDelegator.delegate(event.type, event, layerController);
    });
  });
});
