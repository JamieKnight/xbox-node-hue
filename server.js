var http = require('http');

http.createServer( function(req,res) {

   var currentTime = new Date();
   console.log('Client called at '+currentTime);

   res.writeHead(200, {'Content-Type':'text/plain'});
   res.write('The House is still here...\n');
   res.write('Enjoy the Beach !\n');
   res.end();

}).listen('8124');