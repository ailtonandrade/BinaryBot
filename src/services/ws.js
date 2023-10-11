import * as signalR from "@microsoft/signalr";

class Ws {
  constructor() {
    // URL do servidor WebSocket (certifique-se de que corresponda ao seu servidor)
    this.serverUrl = "wss://localhost:7079/ws";

    // Crie uma instância da conexão SignalR
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.serverUrl)
      .build();

    // Defina um tratamento para mensagens recebidas
    this.connection.on("Receive", (message) => {
      console.log("Received message: " + message);
    });
  }

  async startConnection() {
    try {
      // Inicie a conexão com o servidor WebSocket
      await this.connection.start();
      console.log("WebSocket connection established.");
    } catch (error) {
      console.error("WebSocket connection failed: " + error);
    }
  }

  async sendMessage(message) {
    try {
      // Agora que a conexão está ativa, você pode enviar mensagens
      await this.connection.invoke("Send", message); // Chame o método "Send" no servidor
      console.log("Message sent: " + message);
    } catch (error) {
      console.error("Error sending message: " + error);
    }
  }
}

export default new Ws();
