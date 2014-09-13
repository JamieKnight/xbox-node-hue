var hue = require("node-hue-api");

/**
 * Creates and interface for setting up lamps individually and in bulk.
 * 
 * @param host {String} IP Adress for hue bridge
 * @param  username {String} Username for bridge
 * @example
 * new Lamps('192.168.1.1','bob')
 * 
 * @returns {Function} Lamps Object
 */
var lamps = function(host, username){
    this.host = host || "10.0.1.20";
    this.username = username || "newdeveloper";
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

// Current Lamp Management
lamps.prototype.setCurrentLampRGB = function(color){

  switch (color) {
    case "green":
      var r = 0, g = 255, b = 0;
      break;
    case "red":
      var r = 255, g = 0, b = 0;
      break;
    case "blue":
      var r = 0, g = 0, b = 255;
      break;
  }
  
  this.api.setLightState(this.currentLamp, this.lightState.create().on().rgb(r, g, b))
    .then(this.displayResult)
    .fail(this.displayError)
    .done();
}

lamps.prototype.setCurrentLampState = function(state) {

  var lamp = (state == "off") ? this.lightState.create().off() : this.lightState.create().on() ; 

  this.api.setLightState(this.currentLamp, lamp)
    .then(this.displayResult)
    .fail(this.displayError)
    .done();
}

lamps.prototype.setCurrentLampWhite = function(temp, brightness) {

  var tmp   = temp || 250;
  var brns  = brightness || 50;

  this.api.setLightState(this.currentLamp, this.lightState.create().on().white(tmp, brns))
    .then(this.displayResult)
    .fail(this.displayError)
    .done();
}


// Selection
lamps.prototype.select = function(option) {
  if (option == 'next'){
    this.currentLamp = (this.currentLamp == this.lampCount) ? 1 : ++this.currentLamp;
  } else if (option == 'prev') {
    this.currentLamp = (this.currentLamp == 1) ? this.lampCount : --this.currentLamp;
  }
  this.alertCurrent();
}

lamps.prototype.currentSelected = function(option) {
  this.alertCurrent();
}

// Group Controls
/*
lamps.prototype.setAllLampsRGB(color) {
  for (i = 1; i < (lampCount + 1); i++) {
    this.setCurrentLampRGB(color);   
  }
}

lamps.prototype.setAllLampsWhite() {
  for (i = 1; i < (lampCount + 1); i++) {
    this.lamps.prototype.setCurrentLampWhite();   
  }
}
*/

lamps.prototype.setAllLampsState = function(state) {

  var lamp = (state == "off") ? this.lightState.create().off() : this.lightState.create().on() ; 

  for (i = 1; i < (this.lampCount + 1); i++) {
    this.api.setLightState(i, lamp)
       .then(this.displayResult)
       .fail(this.displayError)
       .done();
  }
}

module.exports = exports = lamps;