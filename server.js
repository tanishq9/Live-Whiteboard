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
        console.log('Received '+data.x1+","+data.y1+"   "+data.x2+","+data.y2);
        socket.broadcast.emit('mouse_react',data);
    });
    socket.on('clear_canvas',function(){
        socket.broadcast.emit('clear_all');
    });
})

server.listen(SERVER_PORT,function(){
    console.log("Server successfully started.");
});


