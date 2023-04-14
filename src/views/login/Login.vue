<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <form>
      <div class="mb-3">
        <label for="usuario" class="form-label">Usuário:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="objUser.username"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha:</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="objUser.password"
        />
      </div>
      <div class="mb-3 d-flex justify-content-center">
        <button
          type="button"
          :disabled="
            objUser.username.length < 5 || objUser.password.length <= 8
          "
          class="btn btn-primary"
          @click="methods.login()"
        >
          Entrar
        </button>
      </div>
      <div class="mb-3">
        <label class="pr-1" for="">Ainda não tem uma conta ? Realize um</label>
        <router-link to="/register">
          <a>Novo cadastro</a>
        </router-link>
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
    const title = ref("BinaryBot");
    const description = ref(
      "Automatize suas operações binårias e trades na plataforma mais usada no mundo"
    );
    const objUser = ref({
      username: "",
      password: "",
    });
    const router = useRouter();
    const methods = {
      async login() {
        if (!objUser.value.username || !objUser.value.password) {
          alert("Por favor, preencha todos os campos.");
        } else {
          AuthService.login(objUser.value)
            .then((response) => {
              methods.verificaLogin(response.data);
            })
            .catch((error) => {
              console.log(error);
              alert(error.response.data);
            })
            .finally(() => {
              objUser.value.username = "";
              objUser.value.password = "";
            });
        }
      },
      verificaLogin(data) {
        if (data) {
          localStorage.setItem("token", data.hash);
          router.push("/dashboard");
        }
      },
      formatInput() {
        objUser.value.username = objUser.value.username.trim();
        objUser.value.password = objUser.value.password.trim();
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
