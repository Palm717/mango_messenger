const socket = io();
const messageOutput = document.querySelector("#message-output");
const messageInput = document.querySelector("#message-input");

io.on((socket) => {
  socket.emit();
});

socket.on("chat_message", (message_data) => {
  messageOutput.insertAdjacentHTML(
    "beforeend",
    `
  <li>${message_data.text}</li>
  `
  );
});

function chatMessage(e) {
  const message_text = e.target.value;

  socket.emit("chat_message", {
    text: message_text,
  });
}

messageInput.addEventListener("keydown", chatMessage);
