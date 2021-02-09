const express = require('express');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const http = require('http');
const path = require('path');

dotenv.config();
const app = express();
app.use(express.static(path.join(__dirname,'frontend')));
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket) => {
    console.log('user conncected');
    // acknowledging the current user
    socket.emit('message', 'welcome to chat app');
    // notifying all other users for current user connection
    socket.broadcast.emit('message',"someone joined the chat")
    // script for when user disconnect
    socket.on('message', (message)=> {
        console.log(message)
    }) 
    console.log('11')
    socket.on('disconnect', () => {
        // notifying everyone for the current user has disconnected
        io.emit('message','someone has left the chat');
    })
})

app.get('/', (req,res) => {
    res.render('index.html')
})

server.listen(port , ()=> {
    console.log(`server set up on port ${port}`)
})