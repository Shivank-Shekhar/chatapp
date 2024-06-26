// const io = require('socket.io-client');


// const socket = io('http://localhost:8000');


// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp')
// const messageContainer = document.querySelector(".container")
// var audio = new Audio('iphone.mp3');

// const append = (message,position) =>{
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messageContainer.append(messageElement);
//     if(position == 'left'){
//         audio.play();
//     }
  
// }

// form.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     const message = messageInput.value;
//     append(`You: ${message}`, 'right')
//     socket.emit('send', message);
//     messageInput.value = ''

// })
// const name = prompt("enter your name to join");
// socket.emit('new-user-joined', name);

// socket.on('user-joined', name => {
//     append(`${name} joined the chat`, 'left')
//  })
 
// socket.on('receive', data => {
//    append(`${data.name}: ${data.message}`, 'left')
// })

// socket.on('left', name=> {
//     append(`${name} left the chat`, 'left')
// })


// ----------------------------------------------------------------------
// // Ensure this script runs after the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io('http://localhost:8000');

//     const form = document.getElementById('send-container');
//     const messageInput = document.getElementById('messageInp');
//     const messageContainer = document.querySelector('.container');
//     var audio = new Audio('iphone.mp3');

//     const append = (message, position) => {
//         const messageElement = document.createElement('div');
//         messageElement.innerText = message;
//         messageElement.classList.add('message');
//         messageElement.classList.add(position);
//         messageContainer.append(messageElement);
//         if (position == 'left') {
//             audio.play();
//         }
//     };

//     // Prompt user for name using browser's prompt function
//     const name = prompt("Enter your name to join");

//     if (name) {
//         // Emit 'new-user-joined' event with the entered name
//         socket.emit('new-user-joined', name);

//         // Event listener for form submission
//         form.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const message = messageInput.value;
//             append(`You: ${message}`, 'right');
//             socket.emit('send', message);
//             messageInput.value = '';
//         });

//         // Socket.io event handlers
//         socket.on('user-joined', (name) => {
//             append(`${name} joined the chat`, 'left');
//         });

//         socket.on('receive', (data) => {
//             append(`${data.name}: ${data.message}`, 'left');
//         });

//         socket.on('left', (name) => {
//             append(`${name} left the chat`, 'left');
//         });
//     } else {
//         // Handle case where user cancels prompt or does not enter a name
//         console.log("User did not enter a name.");
//     }
// // });
// ---------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // Socket connection to the current host

    const form = document.getElementById('send-container');
    const messageInput = document.getElementById('messageInp');
    const messageContainer = document.querySelector('.container');
    var audio = new Audio('iphone.mp3');

    const append = (message, position) => {
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
        if (position == 'left') {
            audio.play();
        }
    };

    // Function to show a modal dialog and get user's name
    const askForName = () => {
        const name = prompt("Enter your name to join");
        if (name) {
            return name;
        } else {
            return null; // Handle case where user cancels or doesn't enter a name
        }
    };

    const name = askForName();

    if (name) {
        socket.emit('new-user-joined', name);

        // Event listener for form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = messageInput.value;
            append(`You: ${message}`, 'right');
            socket.emit('send', message);
            messageInput.value = '';
        });

        // Socket.io event handlers
        socket.on('user-joined', (name) => {
            append(`${name} joined the chat`, 'left');
        });

        socket.on('receive', (data) => {
            append(`${data.name}: ${data.message}`, 'left');
        });

        socket.on('left', (name) => {
            append(`${name} left the chat`, 'left');
        });
    } else {
        console.log("User did not enter a name.");
        // Handle case where user cancels or doesn't enter a name
        // You might want to display an error message or handle it differently
    }
});
