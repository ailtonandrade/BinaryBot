<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <form>
      <div class="mb-3">
        <label for="usuario" class="form-label">Usuário:</label>
        <input type="text" class="form-control" id="name" v-model="objUser.username" placeholder="usuari011011" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha:</label>
        <input type="password" class="form-control" id="password" v-model="objUser.password" placeholder="p@ssw0rd" />
      </div>
      <div class="mb-3 d-flex justify-content-center">
        <button type="button" :disabled="objUser.username.length < 5 || objUser.password.length <= 8 || logging
          " class="btn btn-primary" @click="login()">
          Entrar
        </button>
      </div>
      <div class="d-flex flex-column align-items-center justify-content-center">
        <div class="mb-3">
          <router-link to="/forgot-pass">
            <u><a class=" text-secondary">Esqueci a senha</a></u>
          </router-link>
        </div>
        <div class="mb-3">
          <label class="pr-1" for="">Ainda não tem uma conta ? Realize um</label>
          <router-link to="/register">
            <a>Novo cadastro</a>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch, inject, reactive, toRefs } from "vue";
import AuthService from "../../services/AuthService";
import { useRouter } from "vue-router";


export default {
  setup() {
    const title = ref("BinaryBot");
    const description = ref("Automatize suas operações binårias e trades na plataforma mais usada no mundo");
    const objUser = ref({
      username: "",
      password: "",
    });
    const logging = ref(false);
    const messageBox = inject("messageBox");
    const router = useRouter();
    const methods = reactive({
      login() {
        if (!objUser.value.username || !objUser.value.password) {
          alert("Por favor, preencha todos os campos.");
        }
        else {
          logging.value = true;
          AuthService.login(objUser.value)
            .then((response) => {
              methods.verificaLogin(response.data);
            })
            .catch((error) => {
              console.log(error);
              if (error?.response?.data?.length > 0) {
                alert(error.response.data);
              }
            })
            .finally(() => {
              objUser.value.username = "";
              objUser.value.password = "";
              logging.value = false;
            });
        }
      },
      verificaLogin(data) {
        if (data) {
          localStorage.setItem("token", data.hash);
          if (!data.confirmed) {
            messageBox("sdasd", "12312312", "fasdad");
          }
          router.push("/dashboard");
        }
      },
      formatInput() {
        objUser.value.username = objUser.value.username.trim();
        objUser.value.password = objUser.value.password.trim();
      },
    });
    watch(objUser.value, (newV, oldV) => {
      methods.formatInput();
    });
    return {
      title,
      description,
      objUser,
      router,
      messageBox,
      ...toRefs(methods),
      logging,
    };
  },
};
</script>
