describe("InteractionMode", function () {

  describe("#transition", function () {
    describe("when a transition function is defined for the given event name", function () {
      var mode, modeName, modeDefinition, transitionSpy;

      beforeEach(function() {
        transitionSpy = jasmine.createSpy("transitionFn");
        modeName = "test-mode";
        modeDefinition = {
          transitions: {
            mousedown: transitionSpy
          }
        };
        mode = new InteractionMode(modeName, modeDefinition);
      });

      it("calls the transition handler", function () {
        event = "some-event-object";
        actor = "my-event-actor";
        mode.transition("mousedown", event, actor);
        expect(transitionSpy).toHaveBeenCalledWith(event, actor);
      });

      it("returns the result of the transition handler", function () {
        var result = "transition result";
        transitionSpy.and.returnValue(result);
        expect(mode.transition("mousedown", event, actor)).toEqual(result)
      });
    });

    describe("when a transition string is defined for the given event name", function() {
      var mode, modeName, modeDefinition, transitionString;

      beforeEach(function() {
        transitionString = "some-other-mode";
        modeName = "test-mode";
        modeDefinition = {
          transitions: {
            mousedown: transitionString
          }
        };
        mode = new InteractionMode(modeName, modeDefinition);
      });

      it("returns the string", function() {
        expect(mode.transition("mousedown")).toEqual(transitionString);
      });
    });

    describe("when a transition is NOT defined for the given event name", function () {
      var mode, modeName;
      beforeEach(function () {
        modeName = "test-mode";
        mode = new InteractionMode(modeName);
      });

      it("returns null", function () {
        // transition() arguments [1]'event' and [2]'actor' omitted
        expect(mode.transition("mousedown")).toBeNull()
      })
    });
  });

  describe("#handle", function () {

    describe("when a handler is defined for the given event name", function () {
      var mode, modeName, modeDefinition, handlerFn;

      beforeEach(function () {
        handlerFn = jasmine.createSpy("handlerFn");
        modeName = "test-name";
        modeDefinition = {
          handlers: {
            mousedown: handlerFn
          }
        };
        mode = new InteractionMode(modeName, modeDefinition);
      });

      it("calls the event handler", function () {
        event = "some-event-object";
        actor = "my-event-actor";
        mode.handle("mousedown", event, actor);
        expect(handlerFn).toHaveBeenCalledWith(event, actor);
      });

      it("returns the result of the event handler", function () {
        var result = "handler result";
        handlerFn.and.returnValue(result);
        expect(mode.handle("mousedown", event, actor)).toEqual(result)
      });
    });

    describe("when a handler is NOT defined for the given event name", function() {
      var mode, modeName;
      beforeEach(function() {
        modeName = "test-mode";
        mode = new InteractionMode(modeName);
      });

      it("Throws an error", function() {
        expect(mode.handle("mousedown")).toBeNull()
      });
    });

  });

});
