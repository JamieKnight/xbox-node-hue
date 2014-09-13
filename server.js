var http = require('http');

http.createServer( function(req,res) {

   var currentTime = new Date();
   console.log('Client called at '+currentTime);
   
   if (req.method == 'POST') {
    console.log("[200] " + req.method + " to " + req.url);
      
    req.on('data', function(chunk) {
      console.log("Received body data:");
      console.log(chunk.toString());
    });
  }
   
   
   

   res.writeHead(200, {'Content-Type':'text/html'});
   res.write('<html><head><title>Test</title></head>');
   res.write('<body><form method="post">Pressing A will set the color <select name="color"><option value="green">Green</option><option value="blue">Blue</option></select><input type="submit" value="save"></form></body><html>');
   res.end();

}).listen('8124');