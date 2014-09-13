//dependencies for the server
var http = require('http');
var querystring = require('querystring');
var util = require('util');
var fs = require('fs');

//dependencies for the controller and hue
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
      
      // request ended -> do something with the data
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.write(form)
      res.write(util.inspect(decodedBody));
      
      colors[0] = decodedBody.color0;
      
      res.write('</body><html>');
      res.end();
    });
  
  } else {  
    //show the form
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.write(form);
    res.write('</body><html>');
    res.end();
  }
}

var joystickAction = function(event){
    if (!event.init && event.value == 1 && (action = buttons[event.number])) {
      action(event);
    }
}

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
    console.log(colors[0]);
    if (colors[0] == "green") {
        setCurrentLampRGB(0, 255, 0);
    } else {
        setCurrentLampRGB(0, 0, 255);
    }
}

//bind server
http.createServer(serverAction).listen('80');
joystick.on('button', joystickAction);