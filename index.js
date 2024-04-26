const { Socket } = require('dgram')
const express = require('express') 
const app = express() 
const http = require('http') 
const server = http.createServer(app) 
const PORT = 8000 
const { Server } = require('socket.io') 
const io = new Server(server) 
server.listen(PORT, () => { 
    console.log(`server is running on http://localhost:${PORT}`);
})

app.get('/', (req,res) => { 
    res.sendFile(__dirname+"/index.html")
})

io.on('connection', (socket) => { 
    console.log(`New user connected, id = ${socket.id}`);
    socket.on('chat', (data) => { 
        io.emit('showChat',data)
    })
})