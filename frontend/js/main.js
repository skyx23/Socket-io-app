const socket = io();
socket.on('message', (message) => {
    let element = document.getElementById("messages");
    let message_area = document.createElement("h5");
    message_area.innerText = message;
    element.appendChild(message_area); 
})

document.querySelector('#chat').addEventListener('submit',(event)=> {
    event.preventDefault();
    let text = document.querySelector('#message').value
    socket.emit('message',text)
})