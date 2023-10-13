const MSG_ERROR_NOT_SEND_MESSAGE = "Connection is not open. Cannot send message.";
const MSG_CONNECTED = "Connection established.";
const MSG_ERROR_CONNECTION_ERROR = "Connection error: ";

class Ws {
  constructor() {
    this.serverUrl = "wss://localhost:7079/ws";
    this.socket = new WebSocket(this.serverUrl);

    this.socket.addEventListener('open', () => {
      console.log(MSG_CONNECTED);
    });

    this.socket.addEventListener('message', (event) => {
      if (this.messageResolver) {
        this.messageResolver(event.data);
        this.messageResolver = null;
      }
    });

    this.socket.addEventListener('error', (error) => {
    this.socket = new WebSocket(this.serverUrl);
      // console.error(MSG_ERROR_CONNECTION_ERROR + error);
    });

    this.socket.addEventListener('close', (event) => {
      // if (event.wasClean) {
      //   console.log("Closed cleanly, code=" + event.code + ", reason=" + event.reason);
      // } else {
      //   console.error("Closed");
      // }
    });
  }

  sendMessage(text, jsonData) {
    return new Promise((resolve, reject) => {
      if (this.socket.readyState === WebSocket.OPEN) {
        const messageObj = {
          text,
          data: jsonData,
        };

        // Converte o objeto em uma string JSON
        const messageString = JSON.stringify(messageObj);

        this.messageResolver = resolve;
        this.socket.send(messageString);
      } else {
        reject(new Error(MSG_ERROR_NOT_SEND_MESSAGE));
      }
    });
  }
}

export default new Ws();
