import { ref, onMounted } from "vue";
import ws from './ws';

let intervalFetchDashInfo = null;
let response = null;

class SocketService {
  async getDashInfo(data) {
    try {
      const response = await ws.sendMessage('getDashInfo', data);
      console.log("Received response:", response);
      return response;
    } catch (err) {
      console.error("Error syncing dash info:", err);
      throw err;
    }
  }

}

export default new SocketService();
