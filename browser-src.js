var websocket = require('websocket-stream');
var stream = websocket('ws://localhost:2000');

var pre = document.querySelector('pre');

stream.on('data', function(chunk) {
  pre.innerText += chunk.toString();
});

document.addEventListener('keypress', function(key) {
  stream.write(String.fromCharCode(key.keyCode));
})