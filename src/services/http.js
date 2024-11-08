import axios from 'axios';
import Auxiliar from '../global/auxiliar';

const baseUrl = process.env.VUE_APP_API_URL;

class Http {

  async post(endpoint, data) {
    try {
      this.showLoading(true);
      var response = await axios.post(baseUrl + endpoint, data, {
        headers: {
          Authorization: localStorage.getItem('token')?.length > 0 ? `Bearer ${localStorage.getItem('token')}` : '',
          'Content-Type': 'application/json',
        }
      })
      return response.data
    } catch (err) {
      if (err.response?.status !== 200 
          && window.location.pathname !== "/") {
        // Redireciona para a raiz
        //window.location.href = "/";
      }
      throw err;
    }
    finally {
      this.showLoading(false);
    }
  }
  async get(endpoint, data) {
    try {
      var resp = null;
      this.showLoading(true);
      var response = await axios.get(baseUrl + endpoint, data, {
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
