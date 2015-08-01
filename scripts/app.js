var rectangleDelegator = new InteractionDelegator("inactive");
rectangleDelegator.debug(true);

for(var i = 0; i < modes.length; i++) {
  var mode = modes[i];
  rectangleDelegator.define([mode.name], mode)
}

window.addEventListener('load', function() {
  var canvas = document.getElementById('canvas');
  var actor = new HTMLRectangleController(canvas);

  canvas.addEventListener("mousemove", function(event) {
    rectangleDelegator.delegate(event, actor);
  });
  canvas.addEventListener("mousedown", function(event) {
    rectangleDelegator.delegate(event, actor);
  });
  canvas.addEventListener("mouseup", function(event) {
    rectangleDelegator.delegate(event, actor);
  });
});
