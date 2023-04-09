import { firebase } from "../firebase";

class AuthService {
  async login(user: string, pass: string) {
    try {
      const doc = await firebase.collection("users").get();
      alert(doc);
    } catch (ex) {
      alert("Erro ao efetuar Login" + ex);
    }
  }
}
export default new AuthService();
