var http = require('http');
var querystring = require('querystring');
var utils = require('util');

var form = '<html><head><title>Test</title></head><body><form method="post">Pressing A will set the color <select name="color"><option value="green">Green</option><option value="blue">Blue</option></select><input type="submit" value="save"></form>';


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