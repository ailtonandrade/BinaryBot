import axios from 'axios';
import Auxiliar from '../global/auxiliar';

const baseUrl = 'https://localhost:7079/';

class Http {

  async post(endpoint, data) {
    try {
      var response = await axios.post(baseUrl + endpoint, data, {
        headers: {
          Authorization: localStorage.getItem('token') != '' ? `Bearer ${localStorage.getItem('token')}` : '',
          'Content-Type': 'application/json',
        }
      })
      return response;
    } catch (err) {
      throw err;
    }
  }
}
export default new Http();
