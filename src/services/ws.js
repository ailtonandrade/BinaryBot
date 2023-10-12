class Ws {
  constructor() {
    // URL do servidor WebSocket
    this.serverUrl = "wss://localhost:7079/ws";

    // Crie uma instância da conexão WebSocket
    this.socket = new WebSocket(this.serverUrl);

    // Defina tratadores de eventos para WebSocket
    this.socket.addEventListener('open', () => {
      console.log("WebSocket connection established.");
    });

    this.socket.addEventListener('message', (event) => {
      console.clear();
      console.log("Received message: " + event.data);

    });

    this.socket.addEventListener('error', (error) => {
      console.error("WebSocket connection error: " + error);
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
    if (this.socket.readyState === WebSocket.OPEN) {
      // Certifique-se de que a conexão WebSocket está aberta antes de enviar uma mensagem
      this.socket.send(message);
      console.log("Message sent: " + message);
    } else {
      console.error("WebSocket connection is not open. Cannot send message.");
    }
  }
}

export default new Ws();
