var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

const port = 5000;

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', port);
app.use(express.static('static'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, function() {
    console.log(`Server running at http://localhost:${port}/`);
});

io.on('connection', function(socket) {
  socket.on('movement', function(data) {
    io.sockets.emit('update', {color: data.color, x: data.x, y: data.y});
  });
});

setInterval(function() {
    io.sockets.emit('wipe');
}, 30000);