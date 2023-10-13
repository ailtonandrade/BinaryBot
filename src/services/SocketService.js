import Auxiliar from '../global/auxiliar';
import ws from './ws';

class SocketService {
  async getDashInfo(data) {
    try {
      const response = await ws.sendMessage("test222");
      console.log("Server response: " + response);
    } catch (err) {
      throw err;
    }
  }
}
export default new SocketService();
