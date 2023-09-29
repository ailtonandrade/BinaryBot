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
        <button 
        type="button" 
        class="btn btn-primary" @click="send()">
          Enviar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch, reactive, toRefs, inject } from "vue";
import AuthService from "../../services/AuthService";
import AccountService from "../../services/AccountService";
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
    const _showModalBox = inject("showModalBox");
    const _addMessageBox = inject("addMessageBox");
    const methods = reactive({
      async send() {
        if (!objUser.value.input) {
          _addMessageBox(
          "Eii...",
          "Por favor, preencha o campo para prosseguir.",
          null,
          "warning",
          null
        );
        } else {
          AccountService.rescuePass(objUser.value)
            .then((response) => {
              methods.responseData(response);
            })
            .catch((error) => {
              _addMessageBox(
                "Oops...",
                error.response.data,
                null,
                "warning",
                null
              );
            })
            .finally(() => {
              objUser.value.input = "";
            });
        }
      },
      responseData(response) {
        if (response.status == 200) {
          _addMessageBox(
                "Oops...",
                "Um email foi enviado para que consiga recuperar a sua conta.",
                null,
                "success",
                null
              );
          router.push("/");
        }
      },
      formatInput() {
        objUser.value.input = objUser.value.input.trim();
      },
    });

    watch(objUser.value, (newV, oldV) => {
      methods.formatInput();
    });
    return {
      title,
      description,
      objUser,
      ...toRefs(methods),
    };
  },
};
</script>
