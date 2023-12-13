const socket = new WebSocket("ws://localhost:4000/websocket"); // Replace this URL with your WebSocket server endpoint

// Connection opened
socket.addEventListener("open", (event) => {
    console.log("WebSocket Connection Established!");
    socket.send("Hello, Server!"); // Sending a message to the server
});

// Listen for messages from the server
socket.addEventListener("message", (event) => {
    console.log("Message from server: ", event.data);
});

// Connection closed
socket.addEventListener("close", (event) => {
    if (event.wasClean) {
        console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
    } else {
        console.error(`Connection died`);
    }
});

// Connection error
socket.addEventListener("error", (error) => {
    console.error("WebSocket Error: ", error);
});