//dependencies for the server
var http = require('http');
var querystring = require('querystring');
var util = require('util');
var fs = require('fs');

var Lamps = require('./lamps');
var lamps = new Lamps();

lamps.setCurrentLampRGB(0, 0, 255);

//dependencies for the controller and hue
/*
var hue = require("node-hue-api");
var joystick = new (require('joystick'))(0, 3500, 350);

//config hue bridge
var host = "10.0.1.20",
    username = "newdeveloper",
    lampCount = 3,
    HueApi = hue.HueApi,
    lightState = hue.lightState,
    api = new HueApi(host, username),
    currentLamp = 1,
    buttons = [],
    axis = [];

//form HTML
var form = fs.readFileSync('form.html');

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

//setup & joystic actions.
var serverAction = function (req,res) {
  
  //process the form
  if (req.method == 'POST') {
    var fullBody = '';
    
    // append the current chunk of data to the fullBody variable
    req.on('data', function(chunk) {
      fullBody += chunk.toString();
    });
    
    // parse the received body data
    req.on('end', function() {  
      var decodedBody = querystring.parse(fullBody);
      
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.write(form)
      res.write(util.inspect(decodedBody));
      
      colors[0] = decodedBody.color0;
      res.end();
    });
  
  } else {  
    //show the form
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.write(form);
    res.end();
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