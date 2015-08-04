var interactionMap = new InteractionMap("inactive");

interactionMap.debug(true);
interactionMap.registerAll(modes);
interactionMap.enable('inactive');

interactionMap.addObserver('bodyClassName', function(modeName) {
  document.body.className = modeName;
});

window.addEventListener('load', function() {
  var canvas = document.getElementById('canvas');
  var controller = new CanvasController(canvas);

  canvas.addEventListener("mousemove", function(event) {
    interactionMap.delegate(event, controller);
  });

  canvas.addEventListener("mousedown", function(event) {
    interactionMap.delegate(event, controller);
  });

  canvas.addEventListener("mouseup", function(event) {
    interactionMap.delegate(event, controller);
  });
});
