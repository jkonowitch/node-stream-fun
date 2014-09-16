var fs = require('fs');
var http = require('http');
var router = require('node-simple-router')();

router.get("/", function(request, response) {
  var stream = fs.createReadStream(__dirname + '/index.html');
  stream.pipe(response);
});

router.get("/client.js", function(req, res) {
  var stream = fs.createReadStream(__dirname + '/client.js');
  stream.pipe(res);
});

var server = http.createServer(router);

var WebSocketServer = require('ws').Server;
var websocket = require('websocket-stream');

var wss = new WebSocketServer({server: server})

// create a Readable stream from stdin
// so we don't `process.stdin.on` for every connection
var keyStream = require('stream').Readable();
keyStream._read = function(){}

process.stdin.on('data', function(chunk) {
  keyStream.push(chunk);

  if (chunk.toString() == 'z') {
    process.exit();
  }
});

wss.on('connection', function(ws) {
  var clientStream = websocket(ws);

  //  out to client
  keyStream.pipe(clientStream);

  // in from client
  clientStream.pipe(process.stdout);
});

server.listen(2000);