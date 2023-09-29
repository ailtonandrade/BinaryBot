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
          v-model="objUser.UserName"
          placeholder="usuari011011"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha:</label>
        <div style="display: flex" class="form-control">
          <input
            style="border-style: none; width: 100%"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="objUser.Password"
            placeholder="p@ssw0rd"
          />
          <button
            @click.prevent="showPassword = !showPassword"
            class="showPassword card"
          >
            {{ showPassword ? "#" : "@" }}
          </button>
        </div>
      </div>
      <div class="mb-3 d-flex justify-content-center">
        <button
          type="button"
          :disabled="
            objUser.UserName.length < 5 ||
            objUser.Password.length <= 8 ||
            logging
          "
          class="btn btn-primary"
          @click="login()"
        >
          Entrar
        </button>
      </div>
      <div class="d-flex flex-column align-items-center justify-content-center">
        <div class="mb-3">
          <router-link to="/forgot-pass">
            <u><a class="text-secondary">Esqueci a senha</a></u>
          </router-link>
        </div>
        <div class="mb-3">
          <label class="pr-1" for=""
            >Ainda não tem uma conta ? Realize um</label
          >
          <router-link to="/register">
            <a>Novo cadastro</a>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch, provide, reactive, toRefs, inject } from "vue";
import AuthService from "../../services/AuthService";
import { useRouter } from "vue-router";
export default {
  components: {},
  setup() {
    const title = ref("");
    const description = ref(
      "Automatize suas operações binårias e trades na plataforma mais usada no mundo"
    );
    const _showModalBox = inject("showModalBox");
    const showPassword = ref(false);
    const objUser = ref({
      UserName: "admin",
      Password: "Tomeisa1204@",
    });
    const _addMessageBox = inject("addMessageBox");
    const logging = ref(false);
    const router = useRouter();
    const methods = reactive({
      login() {
        if (!objUser.value.UserName || !objUser.value.Password) {
          _showModalBox(
            "Atenção",
            "Por favor, preencha todos os campos.",
            "",
            ""
          );
        } else {
          logging.value = true;
          AuthService.login(objUser.value)
            .then((response) => {
              methods.verificaLogin(response.data);
            })
            .catch((error) => {
              if (error?.response?.data?.message) {
                _showModalBox(
                  "Oops...",
                  "Usuário ou senha inválidos",
                  "Descricao",
                  "fa-solid fa-warning",
                  null
                );
              }
            })
            .finally(() => {
              objUser.value.UserName = "";
              objUser.value.Password = "";
              logging.value = false;
            });
        }
      },
      verificaLogin(data) {
        if (data) {
          localStorage.setItem("token", data.hash);
          AuthService.getPerfil()
            .then((response) => {
              if (response?.data) {
                methods.responseData(response.data);
                router.goTo("dashboard");
              }
            })
            .catch((error) => {
              _showModalBox(
                  "Oops...",
                  "Usuário ou senha inválidos",
                  "Descricao",
                  "error",
                  null
                );
            });
        }
      },
      responseData(data) {
        if (data) {
          localStorage.setItem("birthday", data.birthday);
          localStorage.setItem("document", data.document);
          localStorage.setItem("name", data.name);
          localStorage.setItem("userName", data.userName);
          localStorage.setItem("confirmedEmail", data.confirmedEmail);
        }
      },
      formatInput() {
        objUser.value.UserName = objUser.value.UserName.trim();
        objUser.value.Password = objUser.value.Password.trim();
      },
    });

    watch(objUser.value, (newV, oldV) => {
      methods.formatInput();
    });

    return {
      title,
      description,
      objUser,
      showPassword,
      router,
      ...toRefs(methods),
      logging,
    };
  },
};
</script>
