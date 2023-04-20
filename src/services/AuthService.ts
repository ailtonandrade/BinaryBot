import axios from 'axios';
import Auxiliar from '../global/auxiliar';
import http from './http';

const baseUrl = 'https://localhost:7079/';


class AuthService {

  async getPerfil() {
    return http.post("perfil");
  }

  async setValidate() {
    return http.post("validate-acc");
  }
}
export default new AuthService();
