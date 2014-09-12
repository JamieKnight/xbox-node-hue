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

var setCurrentLampRGB = function(r, g, b){
    api.setLightState(currentLamp, lightState.create().on().rgb(r, g, b))
       .then()
       .fail()
       .done();
}

var apress = function(){
    setCurrentLampRGB(0, 255, 0);
}

cmd.stdout.on('data', function(output){
    
    //convert buffer to string
    output = output+'';
    if (output.indexOf("A:1") > -1) {
	apress();
    }
});

cmd.on('close', function(){
    console.log('Finished');
});

//Error handling
cmd.stderr.on('data', function(err){
    console.log(err);
});
