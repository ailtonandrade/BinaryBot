import axios from 'axios';

const baseUrl = 'https://localhost:7079/';
class AuthService {
  async login(user: { username: string, password: string }) {
    return axios.post(baseUrl + "login", user);
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
    axios.post(baseUrl + "register", acc);
  }
}
export default new AuthService();
