import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'https://localhost:7079/';


class AuthService {
  async login(data:any) {
    return http.post("login",await Auxiliar.getHash(data));
  }

  async register(data:any) {
    return http.post("register",await Auxiliar.getHash(data));
  }

  async edit(data:any) {
    return http.post("edit",await Auxiliar.getHash(data));
  }

  async getInfoUser(data:any) {
    return http.post("get-info-user",await Auxiliar.getHash(data));
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
  async setValidate(validate:any) {
    return http.post("validate-acc", validate);
  }
  async rescuePass(obj:any) {
    return http.post("forgot-pass", obj);
  }
  async redefine(data:any) {
    data.UrlMatch = new URLSearchParams(window.location.search).get('hs');
    console.table(data);
    return http.post("redefine-pass",await Auxiliar.getHash(data));
  }
}
export default new AuthService();
