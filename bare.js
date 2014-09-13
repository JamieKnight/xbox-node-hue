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
    actions = [];

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
actions[1] = function () {
   setCurrentLampRGB(255, 0, 0);
}

//A Press
actions[0] = function () {
   setCurrentLampRGB(0, 255, 0);
}

//X Press
actions[2] = function () {
   setCurrentLampRGB(0, 0, 255);
}

//Y Press
actions[3] = function() {
   api.setLightState(currentLamp, lightState.create().off())
       .then(displayResult)
       .fail(displayError)
       .done();
}

//Right Shoulder
actions[5] = function () {
    currentLamp = (currentLamp == 1) ? lampCount : --currentLamp;
    alertCurrent();
}

//Right Shoulder
actions[4] = function() {
    currentLamp = (currentLamp == lampCount) ? 1 : ++currentLamp;
    alertCurrent();
}
//Back
actions[6] = function () {
    alertCurrent();
}

// Xbox
actions[6] = function() {
  for (i = 1; i < (lampCount + 1); i++) {
    api.setLightState(i, lightState.create().off())
       .then(displayResult)
       .fail(displayError)
       .done();
  }
}

// Start
actions[7] = function () {
    for (i = 1; i < (lampCount + 1); i++) {
        api.setLightState(i, lightState.create().on())
           .then(displayResult)
           .fail(displayError)
           .done();
    }
}


//maps actions to functions.
var joystick = new (require('joystick'))(0, 3500, 350);

joystick.on('button', function(event){
  console.log(event);
  if (!event.init && event.value == 1 && (action = actions[event.number])) {
    action();
  }
});

joystick.on('axis', function(event){
  console.log(event);
});