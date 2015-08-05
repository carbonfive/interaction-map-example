var interactionMap = new InteractionMap("inactive");

interactionMap.debug(true);
interactionMap.registerAll(modes);
interactionMap.enable('inactive');

interactionMap.addObserver('bodyClassName', function(modeName) {
  document.body.className = modeName;
});

var workspace = new WorkspaceController();

window.addEventListener('load', function() {
  var canvas = document.getElementById('canvas');

  events = ["mousemove", "mousedown", "mouseup"].forEach(function(event) {
    canvas.addEventListener(event, function(event) {
      interactionMap.delegate(event, workspace.layerController());
    });
  });


});
