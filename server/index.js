const express = require('express');
const app = express();
const http = require('http');

const { Server } = require('socket.io');
const server = http.createServer(app);
const cors = require('cors');

app.use(cors());
const io = new Server(server, {
    cors: {
        origin: "http://locahost:3000",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    socket.on("send-message", (data) => {
        socket.broadcast.emit("receive-message", data);
    })
    socket.on("send-notification", (data) => {
        socket.broadcast.emit("receive-notification", data);
    });
})


server.listen(3001, () => {
    console.log('server Running on port 3001');
})