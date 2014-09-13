var http        = require('http');
var querystring = require('querystring');
var util        = require('util');
var fs          = require('fs');
var form        = fs.readFileSync('form.html');

var Server = function(){

  this.test = "mooo";


  http.createServer(function(req,res) {
     
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
        res.end();
        
        //state[decodedBody.button] = decodedBody.color;
      });
    
    } else {  
      //show the form
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.write(form);
      res.end();
    }
  }).listen('80');
}

module.exports = exports = Server;