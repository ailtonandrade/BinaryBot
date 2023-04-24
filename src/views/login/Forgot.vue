<template>
  <div class="container-fluid">
    <div class="d-flex card-header">
      <div class="col-12 d-flex justify-content-start">
        <router-link to="/">
          <a>Inicio</a>
        </router-link>
      </div>
    </div>
  </div>
  <div class="container">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <form>
      <div class="mb-3">
        <label for="email-user" class="form-label">Email ou nome de
          Usuário:</label>
        <input type="text" class="form-control" id="email-user" v-model="objUser.input"
          placeholder="usuari011011 ou seu@email.com" />
      </div>
      <div class="mb-3 d-flex justify-content-center">
        <button type="button" :disabled="objUser.input.length < 5
          " class="btn btn-primary" @click="methods.send()">
          Enviar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import AuthService from "../../services/AuthService";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("Recuperação de senha");
    const description = ref(
      "Insira seu email ou seu nome de usuário para recuperar o seu cadastro."
    );
    const objUser = ref({
      input: "",
    });
    const router = useRouter();
    const methods = {
      async send() {
        if (!objUser.value.input) {
          alert("Por favor, preencha o campo para prosseguir.");
        } else {
          AuthService.rescuePass(objUser.value)
            .then((response) => {
              methods.responseData(response.data);
            })
            .catch((error) => {
              console.log(error);
              alert(error.response.data);
            })
            .finally(() => {
              objUser.value.input = "";
            });
        }
      },
      responseData(data) {
        if (data) {
          alert("Um email foi enviado para que consiga recuperar a sua conta.");
          router.push("/");
        }
      },
      formatInput() {
        objUser.value.input = objUser.value.input.trim();
      },
    };

    watch(objUser.value, (newV, oldV) => {
      methods.formatInput();
    });
    return {
      title,
      description,
      objUser,
      methods,
    };
  },
};
</script>
