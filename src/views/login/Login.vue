<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <form>
      <div class="mb-3">
        <label for="usuario" class="form-label">Usuário:</label>
        <input type="text" class="form-control" id="name" v-model="usuario" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha:</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
        />
      </div>
      <div class="mb-3">
        <button type="button" class="btn btn-primary" @click="methods.login()">
          Entrar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import AuthService from "../../services/AuthService";

export default {
  setup() {
    const title = ref("BinaryBot");
    const description = ref(
      "Automatize suas operações binårias e trades na plataforma mais usada no mundo"
    );
    const usuario = ref("");
    const password = ref("");

    const methods = {
      login() {
        if (!usuario.value || !password.value) {
          alert("Por favor, preencha todos os campos.");
        } else {
          alert("Efetuando login");
          AuthService.login(usuario.value, password.value);
        }
      },
    };

    return {
      title,
      description,
      usuario,
      password,
      methods,
    };
  },
};
</script>
