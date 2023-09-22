import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'https://localhost:7079/';


class AuthService {
  async login(data) {
    return http.post("login",await Auxiliar.getHash(data));
  }

  async register(data) {
    return http.post("register",await Auxiliar.getHash(data));
  }

  async edit(data) {
    return http.post("edit",await Auxiliar.getHash(data));
  }

  async getInfoUser() {
    return http.post("get-info-user",null);
  }

  async getPerfil() {
    return http.post("perfil", null);
  }
  async getValidate() {
    const searchParams = new URLSearchParams(window.location.search);
    return http.post("validate", { urlMatch: searchParams.get('hf')});
  }
  async reSendCode() {
    const searchParams = new URLSearchParams(window.location.search);
    return http.post("re-send-code", { urlMatch: searchParams.get('hf')});
  }
  async setValidate(validate) {
    return http.post("validate-acc", validate);
  }
  async rescuePass(obj) {
    return http.post("forgot-pass", obj);
  }
  async redefine(data) {
    data.UrlMatch = new URLSearchParams(window.location.search).get('hs');
    return http.post("redefine-pass",await Auxiliar.getHash(data));
  }
}
export default new AuthService();
