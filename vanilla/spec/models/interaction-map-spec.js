describe("InteractionMap", function() {
  describe("constructor", function() {
    describe("without arguments", function() {
      it("initializes it's 'modes' property to an empty object", function() {
        var interactionMap = new InteractionMap();
        expect(interactionMap.getModes()).toEqual({})
      });
    });

    describe("with an array of InteractionMap instances", function() {
      var interactionModes;
      beforeEach(function() {
        interactionModes = [
          new InteractionMode("mode-one"),
          new InteractionMode("mode-two")
        ]
      });

      it("adds the InteractionMap instances to it's modes", function() {
        var interactionMap = new InteractionMap(interactionModes);
        var registeredNames = [];
        var modes = interactionMap.getModes();
        for(var modeName in modes) {
          if(modes.hasOwnProperty(modeName)) {
            registeredNames.push(modeName);
          }
        }
        expect(registeredNames).toEqual(["mode-one", "mode-two"]);
      });
    });
  });

  describe("#register", function() {
    var map, mode;
    it("adds the InteractionMode to .modes", function() {
      mode = {name: 'myMode'};
      map = new InteractionMap();
      map.register(mode);
      expect(map.getModes()).toEqual({myMode: mode})
    });
  });

  describe("#registerAll", function() {
    it("adds each member of the given array to .modes", function() {
      modes = [{name: 'one'}, {name: 'two'}];
      map = new InteractionMap();
      map.registerAll(modes);
      expect(map.getModes()).toEqual({one: modes[0], two: modes[1]})
    });
  });

  describe("#enable", function() {
    var map, modeOne, modeTwo;
    describe("when given the name of a registered InteractionMode", function() {
      beforeEach(function(){
        map = new InteractionMap();
        modeOne = {name: 'one'};
        modeTwo = {name: 'two'};
        modes = [modeOne, modeTwo];
        map.registerAll(modes);
        map.enable(modeOne.name);
      });

      it("enables the named InteractionMode", function() {
        expect(map.getEnabled()).toEqual(modeOne);
      });
    });

    describe("when given the name of an unregistered mode", function() {
      beforeEach(function(){
        map = new InteractionMap();
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

  describe("#transition", function() {
    var map, modeOne, modeTwo;
    beforeEach(function() {
      modeOne = new InteractionMode('mode one');
      modeTwo = new InteractionMode('mode two');
      map = new InteractionMap([modeOne, modeTwo]);
      map.enable(modeOne.name);
    });

    it("calls transition() on the enabled InteractionMode", function() {
      spyOn(modeOne, 'transition');
      map.transition("eventName","event","actor");
      expect(modeOne.transition).toHaveBeenCalledWith("eventName","event","actor");
    });

    describe("when the call to transition() on the enabled InteractionMode returns a falsy value", function() {
      beforeEach(function() {
        spyOn(modeOne, 'transition').and.returnValue(undefined);
      });

      it("does not change the enabled mode", function() {
        expect(map.getEnabled()).toEqual(modeOne);
        map.transition();
        expect(map.getEnabled()).toEqual(modeOne);
      });

      it("returns false", function() {
        expect(map.transition()).toBe(false);
      });
    });

    describe("when the call to transition() on the enabled InteractionMode returns a mode name", function() {
      beforeEach(function() {
        spyOn(modeOne, 'transition').and.returnValue(modeTwo.name);
      });

      it("enables the returned mode", function() {
        expect(map.getEnabled()).toEqual(modeOne);
        map.transition();
        expect(map.getEnabled()).toEqual(modeTwo);
      });

      it("returns true", function() {
        expect(map.transition()).toBe(true);
      });
    });
  });
});
