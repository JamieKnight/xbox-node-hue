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



//action map
var actions = {
  'a:press': function() { lamps.setCurrentLampRGB(0,255,0); },
  'y:press': function() { lamps.setCurrentLampOff(); }
}

joystick.on('button', function(event){
    console.log(server.state);
    if (!event.init 
         && type[event.type] 
         && type[event.type][event.number] 
         && type[event.type][event.number][event.value]
    ) {      
      var eventName = type[event.type][event.number][event.value];
      if (typeof actions[eventName] !== 'undefined' ) {
          actions[eventName]() 
      }
    }
});