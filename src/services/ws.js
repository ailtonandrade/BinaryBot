const MSG_ERROR_NOT_SEND_MESSAGE = "Connection is not open. Cannot send message.";
const MSG_CONNECTED = "Connection established.";
const SENDING_MESSAGE = "Sending message.";
const MSG_ERROR_CONNECTION_ERROR = "Connection error: ";

class Ws {
  constructor() {
    this.serverUrl = "wss://localhost:7079/ws/";
    if (localStorage.getItem("token")) {

      this.socket = new WebSocket(this.serverUrl);

      this.socket.addEventListener('open', (conn) => {
        let clientId = localStorage.getItem("token");
        this.socket.send(JSON.stringify({ type: 'client-id', clientId }));
        console.log(conn)
      });

      this.socket.addEventListener('error', (error) => {
        error.preventDefault();
      });

      this.socket.addEventListener('message', (event) => {
        if (this.messageResolver) {
          this.messageResolver(event.data);
          this.messageResolver = null;
        }
      });
      // this.socket.addEventListener('error', (error) => {
      //   console.error(MSG_ERROR_CONNECTION_ERROR + error);
      // });

      this.socket.addEventListener('close', (event) => {
        console.error("Closed");
      });
    }
  }


  sendMessage(message, detail) {
    console.log("222")
    console.log(this.socket)
    return new Promise((resolve, reject) => {
      if (this.socket.readyState === WebSocket.OPEN) {
        const data = {
          user: localStorage.getItem("userName"),
          detais: JSON.stringify(detail)
        };
        console.log("sending_data:" + data);
        this.messageResolver = resolve;
        console.log(this.serverUrl + message)
        this.socket.send(this.serverUrl + message, JSON.stringify(data));
      } else {
        reject(new Error(MSG_ERROR_NOT_SEND_MESSAGE));
      }
    });
  }
}

export default new Ws();
