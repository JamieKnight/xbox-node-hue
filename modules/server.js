var http        = require('http');
var querystring = require('querystring');
var util        = require('util');
var fs          = require('fs');
var form        = fs.readFileSync('form.html');

var Server = function(){
  this.state = {};
  http.createServer(this.request.bind(this)).listen('80');
}

Server.prototype.getState = function(){
  return this.state;
}

Server.prototype.request = function(req,res) {

  var state = this.state;

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
      
      //modify in memory state array.   
      state[decodedBody.button] = {type: decodedBody.type, value: decodedBody.value}
      
      //reload the page.
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.write(form)
      res.end();
    });
  
  } else {  
    //show the form
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.write(form);
    res.end();
  }
}

module.exports = exports = Server;