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
An Interaction Map consists of three components: A collection of __Interaction Modes__, at least one 
__Interaction Actor__, and an __Interaction Delegator__. I’ll give you an overview of the responsibility of each 
component and then I’ll walk through the example app implemented in this repository.

### Interaction Mode
The __Interaction Mode__ is the fundamental unit of the Interaction Map pattern. Each __Interaction Mode__ defines a 
state, the events that can be handled in that state, and the events that will trigger a change to another state. 

### Interaction Delegator
The __Interaction Delegator__ is responsible for keeping track of the enabled __Interaction Mode__ and delegating
events to it.

### Interaction Actor
The __Interaction Actor__ is responsible for interactions with the larger application. The __Interaction Delegator__ must
pass the __Interacton Actor__ to the __Transition Functions__ and __Event Handlers__, defined in __Interaction Modes__.
While the Interaction Mode and Interaction Map implementations are generic enough to be re-used in different applications, 
the Interaction Actor is where the application/domain logic lives.
