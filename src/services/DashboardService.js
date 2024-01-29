import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'dashboard';
class DashboardService {
  async getStockMarket(data) {
    try {
      return await http.get(baseUrl + "/get-stock-market", await Auxiliar.getHash(data));
    } catch (err) {
      throw err;
    }
  }
}
export default new DashboardService();
