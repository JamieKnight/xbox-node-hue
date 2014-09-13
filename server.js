var http = require('http');

http.createServer( function(req,res) {

   var currentTime = new Date();
   console.log('Client called at '+currentTime);

   res.writeHead(200, {'Content-Type':'text/html'});
   res.write('<html><head><title>Test</title></head>');
   res.write('<body><form>Pressing A will set the color <select name="color"><option value="green">Green</option><option value="blue">Blue</option></select></form></body><html>');
   res.end();

}).listen('8124');