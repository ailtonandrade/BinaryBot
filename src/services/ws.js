class Ws {
  constructor() {
    const msgErrorNotSendMessage = "WebSocket connection is not open. Cannot send message.";
    const msgErrorNotConnected = "WebSocket connection established.";
    const msgErrorConnectionError = "WebSocket connection error: ";
    
    this.serverUrl = "wss://localhost:7079/ws";
    this.socket = new WebSocket(this.serverUrl);

    this.socket.addEventListener('open', () => {
      console.log(msgErrorNotConnected);
    });

    this.socket.addEventListener('message', (event) => {
      if (this.messageResolver) {
        this.messageResolver(event.data);
        this.messageResolver = null;
      }
    });

    this.socket.addEventListener('error', (error) => {
      console.error(msgErrorConnectionError + error);
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log("WebSocket connection closed cleanly, code=" + event.code + ", reason=" + event.reason);
      } else {
        console.error("WebSocket connection abruptly closed");
      }
    });
  }

  sendMessage(message) {
    return new Promise((resolve) => {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.messageResolver = resolve;
        this.socket.send(message);
      } else {
        console.error(msgErrorNotSendMessage);
      }
    });
  }
}

export default new Ws();
