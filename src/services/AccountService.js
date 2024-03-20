import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'account';


class AccountService {
  async register(data) {
    return http.post(baseUrl + "/register", await Auxiliar.getHash(data));
  }
  async edit(data) {
    return http.post(baseUrl + "/edit", await Auxiliar.getHash(data));
  }
  async getInfoUser() {
    return http.post(baseUrl + "/get-info-user", { UserName: localStorage.getItem("userName") });
  }
  async reSendCode() {
    const searchParams = new URLSearchParams(window.location.search);
    return http.post(baseUrl + "/re-send-code", { urlMatch: searchParams.get('hf') });
  }
  async rescuePass(obj) {
    return http.post(baseUrl + "/forgot-pass", obj);
  }
  async redefine(data) {
    data.UrlMatch = new URLSearchParams(window.location.search).get('hf');
    return http.post(baseUrl + "/redefine", await Auxiliar.getHashRedefine(data));
  }

  async getAllUsers(){
    return http.get(baseUrl + "/get-all-users");
  }
}
export default new AccountService();
