var Layer = function(name, el, zIndex) {
  var objects = [];

  var createShape = function(model) {
    var element = document.createElement('div');
    var id = "obj-"+performance.now().toString().replace(".",'-');
    element.setAttribute('id', id);
    element.style.zIndex = objects.length + zIndex;
    var obj = {element: element, model: model};
    objects.push(obj);
    return obj;
  };

  var appendShape = function(obj) {
    el.appendChild(obj.element);
  };

  return {
    objectsContaining: function(point) {
      return objects.filter(function(obj) {
        return obj.model.contains(point);
      });
    },
    topObjectContaining: function(point) {
      return this.objectsContaining(point).sort(function(a,b){
        return b.element.style.zIndex - a.element.style.zIndex;
      })[0];
    },
    addShape: function(model) {
      var obj = createShape(model);
      appendShape(obj);
      return obj;
    },
    box: function() {
      return el.getBoundingClientRect();
    },
    name: function() {
      return name;
    }
  }
};
