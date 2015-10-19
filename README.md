# Interaction Map: A Design Pattern for Context Dependent User Interactions

## Summary
What follows is a description of a design pattern that I'm calling the Interaction Map Pattern. It is intended to be 
used when implementing a user interface that responds to the same event in a number of different ways, depending on the
context and/or state of the application when the event is invoked. For example, in a drawing application pressing the 
mouse down, dragging the cursor, then releasing the mouse will have one effect when the 'paintbrush' tool is selected,
another when the 'eraser' tool is selected, yet another when the 'select' tool is selected, and so on.

The Interaction Map Pattern attempts to reduce the cognitive overhead required to understand and modify the code for 
such user interfaces by explicitly defining every possible state and also the state transitions. The pattern is similar
to a state machine except that it is permissible to "jump" between states that are not explicitly connected by transition
functions.

An added benefit of implementing an Interaction Map is that it creates an unambiguous vocabulary for the user interface 
which can be used to facilitate communication amongst developers as well as between developers and non-technical
members of the team.

## The Pattern
The Interaction Map pattern consists of three primary components: A collection of __Interaction Modes__, an 
__Interaction Map__, and an __Interaction Delegator__. The pattern also expects a secondary component that I'll call 
an __Interaction Controller__. What follows is an overview of the responsibility of each component.

### Interaction Mode
The __Interaction Mode__ is the fundamental unit of the Interaction Map pattern. Each __Interaction Mode__ defines a
mode name, a set of __Transition Functions__ that are responsible for deciding if the mode should handle a given 
event, and a set of __Event Handlers__ that are responsible for responding to events that the mode cares about. 

### Interaction Map
An __Interaction Map__ contains a register of available __Interaction Modes__. Only one mode may be active at any 
given time. The __Interaction Map__ is responsible for keeping track of the enabled mode and for invoking event 
transition and handler functions on it.

### Interaction Delegator
The __Interaction Delegator__ is responsible for delegating events to an __Interaction Map__. In the sample 
implementation it is also responsible for notifying observers when the enabled __Interaction Mode__ changes. For the 
purpose of the pattern description, I haven't decided if mode change notification should be considered an __Interaction 
Delegator__ responsibility.

### Interaction Controller
The __Interaction Controller__ is responsible for interactions with the larger application. I am calling it a 
controller here because in the sample implementation the meat of the domain logic is implemented with an MVC pattern,
but the Interaction Map pattern is not proscriptive about the behavior of the __Interaction Controller__. It can be any 
type of object. The important thing is that the __Interaction Map__ MUST pass the __Interaction Controller__ to 
the __Interaction Mode's__ __Transition Functions__ and __Event Handlers__.

## The Flow
The pattern works like this:
  1. The interaction delegator receives an event.
  2. The interaction delegator sends the event to the Interaction Map.
  3. The interaction map calls the `transition` function on the active interaction mode.
  4. The interaction mode calls the transition function that matches the event name passed into `transition`, if it 
  exists, and returns the transition function's return value. If no transition function is defined the interaction 
  mode may either return it's own name or a falsy value.
  5. If the `transition` function returns the name of a different interaction mode then the interaction delegator 
  switches the active interaction mode to match the one named.
  6. The interaction delegator calls the `handle` method on the active interaction mode (which may have changed in 
  step 4). 
  7. The interaction mode calls the event handler that matches the event name passed into `handle`, if it exists. If 
  no event handler exists the event is ignored.
