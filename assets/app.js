//set up websocket connection

class WsApp {
  webSocket;
  messages = [];
  newMessage;
  messageBoxID = "chatMessages";

  constructor() {
    this.webSocket = new WebSocket("ws://localhost:8080/ws");
    this.webSocket.addEventListener("open", (event) => {
      console.log("connected to WS!");
      // this.onWebsocketOpen(event);
    });
    this.webSocket.addEventListener("message", (event) => {
      this.handleNewMessage(event);
    });
  }

  handleNewMessage(event) {
    let data = event.data;
    data = data.split(/\r?\n/);

    for (let i = 0; i < data.length; i++) {
      let msg = JSON.parse(data[i]);
      this.messages.push(msg);
    }

    const messageBox = document.getElementById(this.messageBoxID);
    messageBox.innerHTML = "";

    for (let i = 0; i < this.messages.length; i++) {
      let messageDiv = document.createElement("div");
      messageDiv.append(this.messages[i].message);
      messageBox.append(messageDiv);
    }
  }

  sendMessage() {
    if (this.newMessage !== "") {
      this.webSocket.send(JSON.stringify({ message: this.newMessage }));
      this.newMessage = "";
    }
  }
}

const websocket = new WsApp();
const chatForm = document.getElementById("chat");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const chatMessage = document.getElementById("chat_message");
  const chatUser = document.getElementById("chat_user");

  if (chatMessage.value !== "") {
    websocket.newMessage = chatUser.value + ": " + chatMessage.value;
    websocket.sendMessage();
  } else {
    console.error("chat message not defined");
  }
});
