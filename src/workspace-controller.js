var WorkspaceController = function() {
  var canvas;
  var layers = [];
  var layerControllers = [];
  var activeLayer = 0;

  var createLayerEl = function(canvas, number) {
    var el = document.createElement('div');
    el.setAttribute('id','layer-'+number);
    return canvas.appendChild(el);
  };

  var addLayer = function(name, canvas) {
    var number = canvas.childNodes.length + 1;
    var layer = new Layer(name, createLayerEl(canvas, number), 10*number);
    var controller = new LayerController(layer);
    layers.push(layer);
    layerControllers.push(controller);
    return layer;
  };

  window.addEventListener('load', function() {
    canvas = document.getElementById('canvas');
    addLayer("Layer 1", canvas);

    document.getElementById('new-layer').addEventListener("click", function() {
      addLayer("Layer" + layers.length, canvas);
      activeLayer = layers.length - 1;
    });
  });

  return {
    layerController: function() {
      return layerControllers[activeLayer];
    }
  }
};
