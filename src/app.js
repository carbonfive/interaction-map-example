var rectangleDelegator = new InteractionDelegator("inactive");
rectangleDelegator.debug(true);

for(var i = 0; i < modes.length; i++) {
  var mode = modes[i];
  rectangleDelegator.define([mode.name], mode)
}

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
