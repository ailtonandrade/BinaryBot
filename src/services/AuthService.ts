import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'https://localhost:7079/';


class AuthService {

  async getPerfil() {
    return http.post("perfil", null);
  }
  async getValidate() {
    const searchParams = new URLSearchParams(window.location.search);
    return http.post("validate", { urlMatch: searchParams.get('hf')});
  }
  async setValidate(validate:any) {
    return http.post("validate-acc", validate);
  }
}
export default new AuthService();
