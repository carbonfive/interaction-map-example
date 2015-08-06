describe("InteractionMap", function() {
  describe("#register", function() {
    var map, mode;
    it("adds the InteractionMode to .modes", function() {
      mode = {name: 'myMode'};
      map = new InteractionDelegator();
      map.register(mode);
      expect(map.modes()).toEqual({myMode: mode})
    });
  });

  describe("#registerAll", function() {
    it("adds each member of the given array to .modes", function() {
      modes = [{name: 'one'}, {name: 'two'}];
      map = new InteractionDelegator();
      map.registerAll(modes);
      expect(map.modes()).toEqual({one: modes[0], two: modes[1]})
    });
  });

  describe("#enable", function() {
    var map, modeOne, modeTwo;
    describe("when given the name of a registered InteractionMode", function() {
      beforeEach(function(){
        map = new InteractionDelegator();
        modeOne = {name: 'one'};
        modeTwo = {name: 'two'};
        modes = [modeOne, modeTwo];
        map.registerAll(modes);
        map.enable(modeOne.name);
      });

      it("enables the named InteractionMode", function() {
        expect(map.enabled()).toEqual(modeOne);
      });
    });

    describe("when given the name of an unregistered mode", function() {
      beforeEach(function(){
        map = new InteractionDelegator();
        modeOne = {name: 'one'};
        modeTwo = {name: 'two'};
        modes = [modeOne, modeTwo];
        map.registerAll(modes);
      });

      it("throws an error", function() {
        expect(function() {
          map.enable("unknownMode");
        }).toThrowError();
      });
    });
  });

  describe("#delegate", function() {
    describe("when the enabled InteractionMode does NOT have a transition function defined for the given event", function() {
      var map, handlerFn, event, actor;
      beforeEach(function() {
        map = new InteractionDelegator();
        event = {type: 'mousedown'};
        actor = "some-interaction-actor";
        handlerFn = jasmine.createSpy();
        mode = new InteractionMode('testMode', {handlers: {mousedown: handlerFn}});
        map.register(mode);
        map.enable(mode.name);
      });

      it("calls the event handler on the currently enabled mode", function() {
        map.delegate(event, actor);
        expect(handlerFn).toHaveBeenCalledWith(event, actor);
      });
    });

    describe("when the enabled InteractionMode has a transition function that returns the name of another mode", function() {
      var map, handlerFn, event, actor;

      beforeEach(function() {
        map = new InteractionDelegator();
        event = {type: 'mousedown'};
        actor = "some-interaction-actor";

        preTransitionHandlerFn = jasmine.createSpy();
        preTransitionTransitionFn = jasmine.createSpy().and.returnValue('postTransitionMode');

        preTransitionMode = new InteractionMode('preTransitionMode', {
          transitions: { mousedown: preTransitionTransitionFn },
          handlers: { mousedown: preTransitionHandlerFn }
        });

        postTransitionHandlerFn = jasmine.createSpy();
        postTransitionTransitionFn = jasmine.createSpy();

        postTransitionMode = new InteractionMode('postTransitionMode', {
          transitions: { mousedown: postTransitionTransitionFn },
          handlers: {mousedown: postTransitionHandlerFn }
        });

        map.registerAll([preTransitionMode, postTransitionMode]);
        map.enable(preTransitionMode.name);

        map.delegate(event, actor);
      });

      it("calls the transition handler of the first mode", function() {
        expect(preTransitionTransitionFn).toHaveBeenCalledWith(event, actor);
      });

      it("calls the event handler of the second mode", function() {
        expect(postTransitionHandlerFn).toHaveBeenCalledWith(event, actor);
      });

      it("does not call the event handler of the first mode", function() {
        expect(preTransitionHandlerFn).not.toHaveBeenCalled();
      });

      it("does not call the transition handler of the second mode", function() {
        expect(postTransitionTransitionFn).not.toHaveBeenCalled();
      });
    });
  });
});
