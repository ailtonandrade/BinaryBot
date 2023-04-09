<<<<<<< HEAD
import { db } from "../firebase";

async function login(user: string, pass: string) {
  try {
    const doc = await db.collection("users").get();
    alert(doc);
  } catch (ex) {
    alert("Erro ao efetuar Login" + ex);
  }
}
=======
import axios from "axios";

const authService = {
  login: async function (username: string, password: string) {
    try {
      console.log("Enviando dados.");
      const response = await axios.post("/api/login", { username, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
    alert("Erro ao autenticar : "+error.response.data);
      throw new Error(error.response.data.message || "Erro ao efetuar login.");
    }
  },

  logout: function () {
    localStorage.removeItem("token");
  },

  isAuthenticated: function () {
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  },

  getToken: function () {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    throw new Error("Token não encontrado.");
  },
};

export default authService;
>>>>>>> e37a0298e2b4bdc34334223b5d0d9476c1e52878
