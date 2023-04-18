import axios from 'axios';
import Auxiliar from '../global/auxiliar';

const baseUrl = 'https://localhost:7079/';


class AuthService {

  private auxiliar = Auxiliar;

  async login(user: { username: string, password: string }) {
    return axios.post(baseUrl + "login", await this.auxiliar.getHashUser(user));
  }

  async register(acc: {
    Name: string,
    UserName: string,
    Birthday: string,
    Document: string,
    Phone: string,
    Email: string,
    Password: string
  }) {
    const _acc = Object.assign({}, acc);
    return axios.post(baseUrl + "register", await this.auxiliar.getHashAcc(_acc));
  }

  async getPerfil() {
    console.table(axios.defaults.headers);
    return axios.post(baseUrl + "perfil");
  }

}
export default new AuthService();
