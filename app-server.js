var lamps       = new (require('./lamps'));
var server      = new (require('./server'));
var joystick    = new (require('joystick'))(0, 3500, 350);

// map joystick events to buttons names
var type = {
  button: {
    0: { 1: "a:press", 0: "a:up" },
    1: { 1: "b:press", 0: "b:up" },
    2: { 1: "x:press", 0: "x:up" },
    3: { 1: "y:press", 0: "y:up" },
    5: { 1: "rb:press", 0: "rb:up" },
    4: { 1: "lb:press", 0: "lb:up" },
    8: { 1: "xbox:press", 0: "xbox:up" },
    6: { 1: "back:press", 0: "back:up" },
    7: { 1: "start:press", 0: "start:up" },
  }
}


//button names to actions.
server.state = {
  'a:press': {type: 'color', value: 'green' },
  'b:press': {type: 'color', value: 'red' },
  'y:press': {type: 'color', value: 'off' },
  'x:press': {type: 'color', value: 'blue' },
  'rb:press': {type: 'selection', value: 'next' },
  'lb:press': {type: 'selection', value: 'prev' },
  'back:press': {type: 'selection', value: 'current' },
  'xbox:press': {type: 'group', value: 'off' },
  'start:press': {type: 'group', value: 'on' },
}

var eventIsMapped = function(event){
  if (!event.init 
       && type[event.type] 
       && type[event.type][event.number] 
       && type[event.type][event.number][event.value]
  ) {
    var eventName = type[event.type][event.number][event.value];
    return server.state[eventName];
  } else {
    return false;
  }
}

var joystickAction = function(event) {

  if ((var action = eventIsMapped(event))) {
    if (action.type == 'color') {
      switch (action.value) {
        case "off":
          lamps.setCurrentLampState(action.value);
          break;
        case "on":
          lamps.setCurrentLampState(action.value);
          break;
        case "white":
          lamps.setCurrentLampWhite();
          break;
        default:
          lamps.setCurrentLampRGB(action.value);
          break;
      }
    } 
    
    if (action.type == 'selection') {
      lamps.select(action.value);
    }
    
    if (action.type == 'group') {
       if (action.value == "on" || action.value == "off") {
          lamps.setAllLampsState(action.value);
       }
    }
  } else {
    console.log("unmapped");
  }
}

joystick.on('button', joystickAction);
joystick.on('axis', joystickAction);