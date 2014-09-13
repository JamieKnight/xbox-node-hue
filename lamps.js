var hue = require("node-hue-api");

var lamps = function(){
    this.host = "10.0.1.20";
    this.username = "newdeveloper";
    this.lampCount = 3;
    this.HueApi = hue.HueApi;
    this.lightState = hue.lightState;
    this.api = new this.HueApi(host, username);
}

// Helpers
lamps.prototype.displayResult = function(result) {
    console.log(result);
};

lamps.prototype.displayError = function(err) {
    console.error(err);
};

lamps.prototype.setCurrentLampRGB = function(r, g, b){
    api.setLightState(this.currentLamp, this.lightState.create().on().rgb(r, g, b))
       .then(this.displayResult)
       .fail(this.displayError)
       .done();
}

module.exports = exports = lamps;