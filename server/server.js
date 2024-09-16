const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

io.on('connection', socket => {
    console.log('User Connected', socket.id);

    socket.on('disconnect', () => {
        console.log('disconnected');
    });

    socket.on('join room', roomId => {
        socket.join(roomId);
        socket.emit('message', 'You joined room: ' + roomId);
    });

    socket.on('percentage', data => {
        io.to(data.roomId).emit('percentage', data.percentage);
    });
});

app.get('/create-room', (req, res) => {
    const uuidRoom = uuidv4().toLocaleUpperCase();
    res.json({ roomId: uuidRoom });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
