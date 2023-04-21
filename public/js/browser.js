// const messageOutput = document.querySelector("#message-output");
// const messageInput = document.querySelector("#message-input");

const socket = io("http://localhost:3000");
socket.on("connect", () => {
  displayMessage(`You connected with id: ${socket.id}`);
});

// Everything below this point JD helped with Code

// io.on((socket) => {
//   socket.emit();
// });
// socket.on("chat_message", (message_data) => {
//   messageOutput.insertAdjacentHTML(
//     "beforeend",
//     `
//   <li>${message_data.text}</li>
//   `
//   );
// });

// function chatMessage(e) {
//   const message_text = e.target.value;

//   socket.emit("chat_message", {
//     text: message_text,
//   });
// }

// messageInput.addEventListener("keydown", chatMessage);
