var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// reserved events
let ON_CONNECTION = "connection";
let ON_DISCONNECT = "disconnect";

//main events
let EVENT_IS_USER_ONLINE = "check_onlien";
let EVENT_SINGLE_CHAT_MASSAGE = "singel_chat_messsage";

//status
let STATUS_MESSAGE_NOT_SENT = 10001;
let STATUS_MESSAGE_SENT = 10002;

let listen_port = 6000;

server.listen(listen_port);


const userMap = new Map();

io.sockets.on(ON_CONNECTION, function(socket){
    onEachUserConnection(socket);
})

function onEachUserConnection(socket) {
  print("--------------------------------------");
  print(
    "Connected => socket ID: " +
      socket.id +
      " User" +
      stringifyToJson(socket.handshake.query)
  );
  onDisconnect(socket);
}

function onDisconnect(socket) {
  socket.on(ON_DISCONNECT, function () {
    print("disconnected " + socket.id);
    socket.removeAllListeners(ON_DISCONNECT);
  });
}

function print(txt) {
  console.log(txt);
}

function stringifyToJson(data) {
  return JSON.stringify(data);
}
