import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'menu';


class MenuService {
  async getAllMenu() {
    return http.post(baseUrl + "/get-all-menu")
  }
}
export default new MenuService();
