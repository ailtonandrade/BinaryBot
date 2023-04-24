import axios from 'axios';
import Auxiliar from '../global/auxiliar';

const baseUrl = 'https://localhost:7079/';

class Http {

  private auxiliar = Auxiliar;

  async post(endpoint: string, data: any) {
    return axios.post(baseUrl + endpoint, data, {
      headers: {
        Authorization: localStorage.getItem('token') != '' ? `Bearer ${localStorage.getItem('token')}` : '',
        'Content-Type': 'application/json',
      }
    });
  }
}
export default new Http();
