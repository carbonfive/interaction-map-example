var WorkspaceController = function() {
  var canvas;
  var layers = [];
  var layerControllers = [];
  var activeLayer = 1;

  var createLayerEl = function(canvas, number) {
    var el = document.createElement('div');
    el.setAttribute('id','layer-'+number);
    return canvas.appendChild(el);
  };

  var addLayer = function(name, canvas) {
    var number = canvas.childNodes.length + 1;
    var layer = new Layer(name, createLayerEl(canvas, number), 1000*number);
    var controller = new LayerController(layer);
    layers[number] = layer;
    layerControllers[number] = controller;
    drawLayerControls();
    return layer;
  };

  var hideLayer = function(number) {
    layers[number].element.style.display = 'none';
  };

  var showLayer = function(number) {
    layers[number].element.style.display = 'block';
  };

  var drawLayerControls = function() {
    var panel = document.getElementById('layer-list');
    while (panel.firstChild) {
      panel.removeChild(panel.firstChild);
    }
    layers.forEach(function(layer, idx) {
      var li = document.createElement('li');
      var label = document.createElement('span');
      label.appendChild(document.createTextNode(layer.name()));
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      li.setAttribute('data-layer', idx);
      li.appendChild(label);
      li.appendChild(checkbox);
      panel.appendChild(li);
    });
    for(var i = 0; i < panel.childNodes.length; i++) {
      var node = panel.childNodes[i];
      node.addEventListener('click', function(event) {
        var layerNumber = event.target.attributes['data-layer'].nodeValue;
        if(layerNumber === activeLayer) {
          console.log('already active', layerNumber);
        } else {
          console.log('activatin', layerNumber);
          activeLayer = layerNumber;
        }
      });
    }
  };

  window.addEventListener('load', function() {
    canvas = document.getElementById('canvas');
    addLayer("Base Layer", canvas);

    document.getElementById('new-layer').addEventListener("click", function() {
      addLayer("Layer " + layers.length, canvas);
      activeLayer = layers.length - 1;
    });
  });

  return {
    layerController: function() {
      return layerControllers[activeLayer];
    }
  }
};
