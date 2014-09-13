var Lamps     = require('./lamps');
var Server    = require('./server');
var joystick = new (require('joystick'))(0, 3500, 350);

var lamps     = new Lamps();
var server    = new Server();

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
  'a:press': function() { this.setCurrentLampRGB(0,255,0); }
}

joystick.on('button', function(event){
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



/*
// Buttons, maps and colors.
var buttons = [],
    colors  = [];
    
colors[0] = 'green';

// Helpers
var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

var setCurrentLampRGB = function(r, g, b){
    api.setLightState(currentLamp, lightState.create().on().rgb(r, g, b))
       .then(displayResult)
       .fail(displayError)
       .done();
}

//mapping
buttons[0] = function() {
  console.log('map completed');
    if (colors[0] == "green") {
        setCurrentLampRGB(0, 255, 0);
    } else {
        setCurrentLampRGB(0, 0, 255);
    }
}

var type = {
  button: {
    0: { 1: "a:press", 0: "a:up" },
    1: { 1: "b:press", 0: "b:up" },
    2: { 1: "x:press", 0: "x:up" },
    3: { 1: "y:press", 0: "y:up" }
  }
}

var actions = {
  'a:press': buttons[0]
}

var joystickAction = function(event){

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
}

//bind server
http.createServer(serverAction).listen('80');
joystick.on('button', joystickAction);
*/