var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;
    
var XboxController = require('xbox-controller');
var xbox = new XboxController;

var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

var host = "10.0.1.20",
    username = "newdeveloper",
    api = new HueApi(host, username);


// --------------------------
// Using a promise

var lightswitch = false;
var currentLamp = 1;
var lampCount = 3;


xbox.on('a:press', function (key) {
	api.setLightState(currentLamp, lightState.create().on().rgb(0, 255, 0))
	   .then(displayResult)
       .fail(displayError)
       .done();
});

xbox.on('b:press', function (key) {
	api.setLightState(currentLamp, lightState.create().on().rgb(255, 0, 0))
       .then(displayResult)
       .fail(displayError)
       .done();
});

xbox.on('x:press', function (key) {
	api.setLightState(currentLamp, lightState.create().on().rgb(0, 0, 255))
       .then(displayResult)
       .fail(displayError)
       .done();
});

xbox.on('y:press', function (key) {
	api.setLightState(currentLamp, lightState.create().off())
	   .then(displayResult)
	   .fail(displayError)
	   .done();
});

xbox.on('leftshoulder:press', function (key) {
	console.log("is: (l) " + currentLamp);
	currentLamp = (currentLamp == 1) ? lampCount : currentLamp--;
	console.log("is now: " + currentLamp);
});

xbox.on('rightshoulder:press', function (key) {
	console.log("is (r): " + currentLamp);
	console.log("count" + lampCount);
	currentLamp = (currentLamp < lampCount) ? currentLamp + 1 : 1;
	console.log("is now: " + currentLamp);
});

xbox.on('xboxbutton:press', function (key) {
	var state = lightState.create().off();
		
	api.setLightState(1, state)
	   .then(displayResult)
	   .fail(displayError)
	   .done();
	   
	api.setLightState(2, state)
	   .then(displayResult)
	   .fail(displayError)
	   .done();
	   
	api.setLightState(3, state)
	   .then(displayResult)
	   .fail(displayError)
	   .done();
});