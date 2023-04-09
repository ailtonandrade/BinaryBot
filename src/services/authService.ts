import { db } from "../firebase";

async function login(user: string, pass: string) {
  try {
    const doc = await db.collection("users").get();
    alert(doc);
  } catch (ex) {
    alert("Erro ao efetuar Login" + ex);
  }
}
