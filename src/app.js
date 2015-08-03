var rectangleDelegator = new InteractionMap("inactive");
rectangleDelegator.debug(true);

rectangleDelegator.registerAll(modes);
rectangleDelegator.enable('inactive');

var setBodyClass = function(modeName) {
  document.body.className = modeName;
};

rectangleDelegator.addObserver('bodyClassName', setBodyClass);

window.addEventListener('load', function() {
  var canvas = document.getElementById('canvas');
  var controller = new CanvasController(canvas);

  canvas.addEventListener("mousemove", function(event) {
    rectangleDelegator.delegate(event, controller);
  });
  canvas.addEventListener("mousedown", function(event) {
    rectangleDelegator.delegate(event, controller);
  });
  canvas.addEventListener("mouseup", function(event) {
    rectangleDelegator.delegate(event, controller);
  });
});
