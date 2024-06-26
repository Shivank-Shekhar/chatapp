const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + '/')); // Serve static files from the current directory

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('new-user-joined', name => {
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { name: 'User', message: message });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', 'User');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
