//Dependencies
var hue = require("node-hue-api");
var XboxController = require('xbox-controller');

//config
var host = "10.0.1.20",
    username = "newdeveloper",
    lampCount = 3;

//setup
var HueApi = hue.HueApi,
    lightState = hue.lightState,
    xbox = new XboxController;
    api = new HueApi(host, username),
    currentLamp = 1;

//helpers
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

var alertCurrent = function() {
    api.setLightState(currentLamp, lightState.create().on().alert())
       .then(displayResult)
       .fail(displayError)
       .done();
}

//do stuff
xbox.on('b:press', function (key) {
   setCurrentLampRGB(255, 0, 0);
});

xbox.on('a:press', function (key) {
   setCurrentLampRGB(0, 255, 0);
});

xbox.on('x:press', function (key) {
   setCurrentLampRGB(0, 0, 255);
});

xbox.on('y:press', function (key) {
    api.setLightState(currentLamp, lightState.create().off())
       .then(displayResult)
       .fail(displayError)
       .done();
});

//loop through lamps for selection.
xbox.on('leftshoulder:press', function (key) {
    currentLamp = (currentLamp == 1) ? lampCount : --currentLamp;
    alertCurrent();
});

xbox.on('rightshoulder:press', function (key) {
    currentLamp = (currentLamp == lampCount) ? 1 : ++currentLamp;
    alertCurrent();
});

xbox.on('back:press', function (key) {
    alertCurrent();
});

//all off, all on.
xbox.on('xboxbutton:press', function (key) {
    for (i = 1; i < (lampCount + 1); i++) {
        api.setLightState(i, lightState.create().off())
           .then(displayResult)
           .fail(displayError)
           .done();
    }
});

xbox.on('start:press', function (key) {
    for (i = 1; i < (lampCount + 1); i++) {
        api.setLightState(i, lightState.create().on())
           .then(displayResult)
           .fail(displayError)
           .done();
    }
});

//presets
xbox.on('dup:press', function (key) {
    for (i = 1; i < (lampCount + 1); i++) {
        api.setLightState(i, lightState.create().on().white(250, 100))
           .then(displayResult)
           .fail(displayError)
           .done();
    }
});

xbox.on('ddown:press', function (key) {
    for (i = 1; i < (lampCount + 1); i++) {
        api.setLightState(i, lightState.create().on().white(250, 10))
           .then(displayResult)
           .fail(displayError)
           .done();
    }
});


