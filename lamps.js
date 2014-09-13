var hue = require("node-hue-api");

var lamps = function(){
    this.host = "10.0.1.20";
    this.username = "newdeveloper";
    this.lampCount = 3;
    this.currentLamp = 1;
    this.HueApi = hue.HueApi;
    this.lightState = hue.lightState;
    this.api = new this.HueApi(this.host, this.username);
}

// Helpers
lamps.prototype.displayResult = function(result) {
    console.log(result);
};

lamps.prototype.displayError = function(err) {
    console.error(err);
};

lamps.prototype.alertCurrent = function() {
    this.api.setLightState(this.currentLamp, this.lightState.create().on().alert())
       .then(this.displayResult)
       .fail(this.displayError)
       .done();
}

lamps.prototype.setCurrentLampRGB = function(color){

  switch (color) {
    case "green":
      var r = 0,
          g = 255,
          b = 0;
      break;
    case "red":
      var r = 255,
          g = 0,
          b = 0;
      break;
    case "blue":
      var r = 0,
          g = 0,
          b = 255;
      break;
    case "white":
      var r = 255,
          g = 255,
          b = 255;
      break;
  }
  
  this.api.setLightState(this.currentLamp, this.lightState.create().on().rgb(r, g, b))
    .then(this.displayResult)
    .fail(this.displayError)
    .done();
}

lamps.prototype.setCurrentLampOff = function() {
  this.api.setLightState(this.currentLamp, this.lightState.create().off())
    .then(this.displayResult)
    .fail(this.displayError)
    .done();
}

lamps.prototype.setCurrentLampWhite = function() {
  this.api.setLightState(this.currentLamp, this.lightState.create().on().white(500, 100))
    .then(this.displayResult)
    .fail(this.displayError)
    .done();
}

lamps.prototype.selectPreviousLamp = function () {
    this.currentLamp = (this.currentLamp == 1) ? this.lampCount : --this.currentLamp;
    this.alertCurrent();
}

//Right Shoulder
lamps.prototype.select  = function(option) {
  if (option == 'next'){
    this.currentLamp = (this.currentLamp == this.lampCount) ? 1 : ++this.currentLamp;
    this.alertCurrent();
  } else if (option == 'prev') {
    this.currentLamp = (this.currentLamp == 1) ? this.lampCount : --this.currentLamp;
    this.alertCurrent();
  }
}

module.exports = exports = lamps;