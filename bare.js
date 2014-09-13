var process = require('child_process');
//var cmd = process.spawn('xboxdrv');
var hue = require("node-hue-api");

var host = "10.0.1.20",
    username = "newdeveloper",
    lampCount = 3;

//setup
var HueApi = hue.HueApi,
    lightState = hue.lightState,
    api = new HueApi(host, username),
    currentLamp = 1,
    buttons = [],
    axis = [];

//helpers
var displayResult = function(result) {
    //console.log(result);
};

var displayError = function(err) {
    //console.error(err);
};


var setCurrentLampRGB = function(r, g, b){
    api.setLightState(currentLamp, lightState.create().on().rgb(r, g, b))
       .then(displayResult)
       .fail(displayError)
       .done();
}

var alertCurrent = function() {
    api.setLightState(currentLamp, lightState.create().on().alert())
       .then(displayResult)
       .fail(displayError)
       .done();
}

//do stuff

//B Press
buttons[1] = function() {
   setCurrentLampRGB(255, 0, 0);
}

//A Press
buttons[0] = function() {
   setCurrentLampRGB(0, 255, 0);
}

//X Press
buttons[2] = function() {
   setCurrentLampRGB(0, 0, 255);
}

//Y Press
buttons[3] = function() {
   api.setLightState(currentLamp, lightState.create().off())
       .then(displayResult)
       .fail(displayError)
       .done();
}

//Right Shoulder
buttons[5] = function () {
    currentLamp = (currentLamp == 1) ? lampCount : --currentLamp;
    alertCurrent();
}

//Right Shoulder
buttons[4] = function() {
    currentLamp = (currentLamp == lampCount) ? 1 : ++currentLamp;
    alertCurrent();
}

// Xbox
buttons[8] = function() {
  for (i = 1; i < (lampCount + 1); i++) {
    api.setLightState(i, lightState.create().off())
       .then(displayResult)
       .fail(displayError)
       .done();
  }
}

// Start
buttons[7] = function () {
    for (i = 1; i < (lampCount + 1); i++) {
        api.setLightState(i, lightState.create().on())
           .then(displayResult)
           .fail(displayError)
           .done();
    }
}

//PRESETS
axis[6] = function (event) {
    if (event.value == 32767) {
      for (i = 1; i < (lampCount + 1); i++) {
        api.setLightState(i, lightState.create().on().white(250, 100))
           .then(displayResult)
           .fail(displayError)
           .done();
       }
    } else if (event.value == -32767){
      for (i = 1; i < (lampCount + 1); i++) {
        api.setLightState(i, lightState.create().on().xy(0.4595,0.4105).brightness(50))
           .then(displayResult)
           .fail(displayError)
           .done();
      }
    } else {
      
    }
}

axis[7] = function (event) {
  if (event.value == 32767) {
     for (i = 1; i < (lampCount + 1); i++) {
        api.setLightState(i, lightState.create().on().xy(0.4595,0.4105).brightness(1))
           .then(displayResult)
           .fail(displayError)
           .done();
    }
  } else {
    for (i = 1; i < (lampCount + 1); i++) {
        api.setLightState(i, lightState.create().on().xy(0.4595,0.4105).brightness(100))
           .then(displayResult)
           .fail(displayError)
           .done();
    }
  }
}

//maps buttons to functions.
var joystick = new (require('joystick'))(0, 3500, 350);

joystick.on('button', function(event){
  console.log(event);
  if (!event.init && event.value == 1 && (action = buttons[event.number])) {
    action(event);
  }
});

joystick.on('axis', function(event){
  console.log(event);
  if (!event.init && event.value !=  0 && (action = axis[event.number])) {
    action(event);
  }
});