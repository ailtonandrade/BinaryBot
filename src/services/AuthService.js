import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'auth';
class AuthService {
  async login(data) {
    return http.post(baseUrl + "/login", await Auxiliar.getHash(data));
  }
  async getPerfil() {
    return http.post(baseUrl + "/perfil", null);
  }
  async getValidate() {
    const searchParams = new URLSearchParams(window.location.search);
    return http.post(baseUrl + "/validate", { urlMatch: searchParams.get('hf') });
  }
  async getValidateCurrent(route) {
    try {
      const resp = await http.post(baseUrl + "/validate-current", { current: localStorage.getItem("token"), route: route })
      return resp.data;
    } catch (err) {
      throw err;
    };
  }

  async setValidate(validate) {
    return http.post(baseUrl + "/validate-acc", validate);
  }
}
export default new AuthService();
