var process = require('child_process');
var cmd = process.spawn('xboxdrv');
var hue = require("node-hue-api");

var host = "10.0.1.20",
    username = "newdeveloper",
    lampCount = 3;

//setup
var HueApi = hue.HueApi,
    lightState = hue.lightState,
    api = new HueApi(host, username),
    currentLamp = 1;

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
       
       console.log( Date.now() + ": " +  currentLamp);
}

//do stuff
var bpress = function () {
   setCurrentLampRGB(255, 0, 0);
}

var apress = function () {
   setCurrentLampRGB(0, 255, 0);
}

var xpress = function () {
   setCurrentLampRGB(0, 0, 255);
}

var ypress = function() {
   api.setLightState(currentLamp, lightState.create().off())
       .then(displayResult)
       .fail(displayError)
       .done();
}


//loop through lamps for selection.
var leftshoulderpress = function () {
    currentLamp = (currentLamp == 1) ? lampCount : --currentLamp;
    alertCurrent();
}

var rightshoulderpress = function() {
    currentLamp = (currentLamp == lampCount) ? 1 : ++currentLamp;
    alertCurrent();
}

var backpress = function () {
    alertCurrent();
}

var guidepress = function() {
  for (i = 1; i < (lampCount + 1); i++) {
    api.setLightState(i, lightState.create().off())
       .then(displayResult)
       .fail(displayError)
       .done();
  }
}

var last = '';

cmd.stdout.on('data', function(output){
    //convert buffer to string
    last = output +'';
    console.log("controller button pressed");    
});


//poll every 500ms
setInterval(function(){         
    var output = last;
    
    if (output.indexOf("A:1") > -1) {
      apress();
    }
    
    if (output.indexOf("B:1") > -1) {
      bpress();
    }
    
    if (output.indexOf("Y:1") > -1) {
      ypress();
    }
    
    if (output.indexOf("X:1") > -1) {
      xpress();
    }
    
    if (output.indexOf("RB:1") > -1) {
      rightshoulderpress();
    }
    
    if (output.indexOf("LB:1") > -1) {
      leftshoulderpress();
    }

    if (output.indexOf("back:1") > -1) {
      backpress();
    }
    
    if (output.indexOf("guide:1") > -1) {
      guidepress();
    }
}, 500);

cmd.on('close', function(){
    console.log('Finished');
});

//Error handling
cmd.stderr.on('data', function(err){
    console.log(err);
});
