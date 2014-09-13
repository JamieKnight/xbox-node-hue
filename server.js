
//SERVER For config page.

var http = require('http');
var querystring = require('querystring');
var util = require('util');

var form = '<html><head><title>Test</title></head><body><form method="post">Pressing A will set the color <select name="color"><option value="green">Green</option><option value="blue">Blue</option></select><input type="submit" value="save"></form>';

var color = "green";

http.createServer( function(req,res) {

   var currentTime = new Date();
   console.log('Client called at '+currentTime);
   
   
   //process the form
   if (req.method == 'POST') {
    var fullBody = '';
    req.on('data', function(chunk) {
      // append the current chunk of data to the fullBody variable
      fullBody += chunk.toString();
    });
    
    req.on('end', function() {
        
      // parse the received body data
      var decodedBody = querystring.parse(fullBody);
      
      // request ended -> do something with the data
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.write(form)
      res.write(util.inspect(decodedBody));
      
      console.log(decodedBody)
      
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

}).listen('8124');

/*
//Respond to controller events:
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

buttons[0] = function() {
  if 
   setCurrentLampRGB(0, 255, 0);
}

var joystick = new (require('joystick'))(0, 3500, 350);

joystick.on('button', function(event){
  console.log(event);
  if (!event.init && event.value == 1 && (action = buttons[event.number])) {
    action(event);
  }
});
*/