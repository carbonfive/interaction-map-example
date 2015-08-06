var interactionMap = new InteractionDelegator("inactive");
interactionMap.debug(true);

interactionMap.registerAll(modes);
interactionMap.enable('inactive');

interactionMap.addObserver('bodyClassName', function(modeName) {
  document.body.className = modeName;
});

window.addEventListener('load', function() {
  var canvas = document.getElementById('canvas');
  var layer = new Layer('base', canvas, 10);
  var layerController = new LayerController(layer);

  events = ["mousemove", "mousedown", "mouseup"].forEach(function(event) {
    canvas.addEventListener(event, function(event) {
      interactionMap.delegate(event, layerController);
    });
  });
});
