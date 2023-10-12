import Auxiliar from '../global/auxiliar';
import ws from './ws';

class SocketService {
  async getDashInfo(data) {
    try {
        setTimeout(() => {
          console.clear()
          ws.sendMessage("test222");
        },2000)
    } catch (err) {
      throw err;
    }
  }
}
export default new SocketService();
