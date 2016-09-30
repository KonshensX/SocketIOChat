var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

app.use('/assets', express.static(__dirname+'/public'));

server.listen(process.env.PORT || 3000)
console.log("Sever is up and running");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});


//Socket.IO stuff
io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log("User joined the chat: %s sockets connected", connections.length);

  //When disconnected
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log("User disconnected: %s sockets connected", connections.length);
  });

  //Send message
  socket.on('send message', function(data){
    io.sockets.emit('new message', {msg: data});
  });

  //New user
  socket.on('user joined', function(data){
    console.log('User just joined the channel');
    users.push(data);
    io.sockets.emit('new user', {users: users});
  });
});
