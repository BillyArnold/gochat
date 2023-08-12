//set up websocket connection

const websocket = new WebSocket("ws://localhost:8080/ws");
websocket.addEventListener("open", (event) => {
  console.log("connected to WS!");
  // this.onWebsocketOpen(event);
});

const handleNewMessage = (event) => {
  let data = event.data;
  data = data.split(/\r?\n/);
  for (let i = 0; i < data.length; i++) {
    let msg = JSON.parse(data[i]);
    this.messages.push(msg);
  }
};

const sendMessage = () => {
  if (this.newMessage !== "") {
    this.ws.send(JSON.stringify({ message: this.newMessage }));
    this.newMessage = "";
  }
};

const data = {
  messages: [],
  newMessage: "",
};

websocket.addEventListener("message", (event) => {
  handleNewMessage(event);
});
