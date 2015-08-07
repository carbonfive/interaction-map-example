describe("InteractionDelegator", function() {
  describe("#delegate", function() {
    var mockInteractionMap, interactionDelegator, args;

    beforeEach(function() {
      args = {
        eventName: "eventname",
        event: "some event",
        actor:"some actor"
      };
      mockInteractionMap = jasmine.createSpyObj('interactionMap', ['transition', 'getEnabled', 'handle']);
      interactionDelegator = new InteractionDelegator(mockInteractionMap);
    });

    it("calls transition() on the InteractionMap", function() {
      interactionDelegator.delegate(args.eventName, args.event, args.actor);
      expect(mockInteractionMap.transition).toHaveBeenCalledWith(args.eventName, args.event, args.actor);
    });

    it("calls handle() on the InteractionMap", function() {
      interactionDelegator.delegate(args.eventName, args.event, args.actor);
      expect(mockInteractionMap.handle).toHaveBeenCalledWith(args.eventName, args.event, args.actor);
    });

    it("calls transition() before it calls handle()", function() {
      var calls = [];
      mockInteractionMap.transition.and.callFake(function() {
        calls.push("transition");
      });
      mockInteractionMap.handle.and.callFake(function() {
        calls.push("handle");
      });
      interactionDelegator.delegate();
      expect(calls).toEqual(["transition","handle"]);
    });

    describe("when the InteractionMap transitions to a different mode", function() {
      var newModeName, mockObserver;
      beforeEach(function() {
        newModeName = 'new-mode';
        mockInteractionMap.transition.and.returnValue(true);
        mockInteractionMap.getEnabled.and.returnValue({name: newModeName});

        mockObserver = jasmine.createSpy('observer');
        interactionDelegator.addObserver('test', mockObserver);
      });

      it("notifies observers", function() {
        interactionDelegator.delegate();
        expect(mockObserver).toHaveBeenCalledWith(newModeName);
      });
    });
  });
});
