import Auxiliar from '../global/auxiliar';
import ws from './ws';

class SocketService {
  async getDashInfo(data) {
    try {
      return await ws.startConnection();
    } catch (err) {
      throw err;
    }
  }
}
export default new SocketService();
