import axios from 'axios';
import Auxiliar from '../global/auxiliar';

const baseUrl = 'https://localhost:7079/';

class Http {

  private auxiliar = Auxiliar;

  async post(endpoint:string) {
    return axios.post(baseUrl + endpoint, null,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
  }
}
export default new Http();
