import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'auth';
class AuthService {
  async login(data) {
    try {
      return await http.post(baseUrl + "/login", await Auxiliar.getHash(data));
    } catch (err) {
      throw err;
    }
  }
  async getPerfil() {
    try {
      return await http.post(baseUrl + "/perfil", null);
    } catch (err) {
      throw err;
    }
  }
  async getValidate() {
    const searchParams = new URLSearchParams(window.location.search);
    return await http.post(baseUrl + "/validate", { urlMatch: searchParams.get('hf') });
  }
  async getValidateCurrent(route) {
    try {
      return await http.post(baseUrl + "/validate-current", { current: localStorage.getItem("token"), route: route })
    } catch (err) {
      throw err;
    };
  }

  async setValidate(validate) {
    return http.post(baseUrl + "/validate-acc", validate);
  }
}
export default new AuthService();
