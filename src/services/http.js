import axios from 'axios';
import Auxiliar from '../global/auxiliar';

const baseUrl = 'https://localhost:7079/';

class Http {

  async post(endpoint, data) {
    try {
      var resp = null;
      this.showLoading(true);
      var response = await axios.post(baseUrl + endpoint, data, {
        headers: {
          Authorization: localStorage.getItem('token')?.length > 0 ? `Bearer ${localStorage.getItem('token')}` : '',
          'Content-Type': 'application/json',
        }
      })
      resp = response.data;
      return resp
    } catch (err) {
      throw err;
    }
    finally {
      this.showLoading(false);
    }
  }
  showLoading(status) {
    const loadingElement = document.getElementById('loading');

    if (loadingElement) {
      loadingElement.style.display = status ? 'block' : 'none';
    }
  }
}
export default new Http();
