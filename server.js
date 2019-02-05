const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const SERVER_PORT = process.env.PORT || 3333;

// this part displays the frontend
app.use('/',express.static(__dirname+'/public'));

io.on('connection',function(socket){
    console.log('New socket from ' + socket.id);
    socket.emit('connected',socket.id);
    socket.on('mouse_dragged',function(data){
        console.log('Received '+data.x+","+data.y);
        socket.broadcast.emit('mouse_react',data);
    });
})

server.listen(SERVER_PORT,function(){
    console.log("Server successfully started.");
});

