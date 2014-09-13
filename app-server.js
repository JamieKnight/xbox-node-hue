var lamps       = new (require('./lamps'));
var server      = new (require('./server'));
var joystick    = new (require('joystick'))(0, 3500, 350);

//key map
var type = {
  button: {
    0: { 1: "a:press", 0: "a:up" },
    1: { 1: "b:press", 0: "b:up" },
    2: { 1: "x:press", 0: "x:up" },
    3: { 1: "y:press", 0: "y:up" }
  }
}

joystick.on('button', function(event){

  if (!event.init 
       && type[event.type] 
       && type[event.type][event.number] 
       && type[event.type][event.number][event.value]
  ) {      
    var eventName = type[event.type][event.number][event.value];
    if (typeof server.state[eventName] !== 'undefined' ) {
      
      var action = server.state[eventName];
    
      if (action == 'off'){
        lamps.setCurrentLampOff();
      } else if (action == 'white') {
        lamps.setCurrentLampWhite(action);
      } else {
        lamps.setCurrentLampRGB(action);
      } 
    }
  }
});