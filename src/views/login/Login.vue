<template>
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-lg-6 col-md-6 col-12 p-0">
        <div class="d-flex justify-center align-center b-shadow-2 decoration-primary h-100">
          <div class="col-12">
            <div class="d-flex justify-center mb-5 mt-3">
              <h1>Binary<span class="secondary b-radius-10 p-1 b-shadow-1">Bot</span></h1>
            </div>
            <div class="col-12 text-center">
              <h1>{{ title }}</h1>
              <p>{{ description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-12 d-flex justify-center align-center">
      <div class="">

          <form>
            <div class="d-flex direction-column align-center mb-5">
              <div class="col-12 mb-3 mt-3">
                <div class="form-control">
                  <div class="d-flex">
                    <div class="col-12">
                      <label for="usuario" class="form-label-text">Usuário:</label>
                      <input type="text" id="name" class="input-text" v-model="objUser.UserName"
                        placeholder="usuari011011" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-control">
                  <div class="d-flex align-center justify-center">
                    <div class="col-10">
                      <label for="password" class="form-label-text">Senha:</label>
                      <input :type="showPassword ? 'text' : 'password'" id="password" class="input-text"
                        v-model="objUser.Password" placeholder="p@ssw0rd" />
                    </div>
                    <div class="col-2 d-flex justify-center">
                      <button @click.prevent="showPassword = !showPassword" class="showHide">
                        {{ showPassword ? "#" : "@" }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div class="col-12">
            <div class="d-flex direction-column justify-center align-center">
              <button type="button" :disabled="objUser.UserName.length < 5 ||
                objUser.Password.length <= 8 ||
                logging
                " class="col-lg-8 col-md-8 col-sm-12 mb-3 btn btn-login decoration-primary b-radius-10 p-1 b-shadow-1"
                @click="login()">
                Entrar
              </button>
              <button type="button"
                class="col-lg-8 col-md-8 col-sm-12 mb-3 btn btn-login decoration-secondary b-radius-10 p-1 b-shadow-1">
                <router-link to="/forgot-pass">
                  Esqueci a senha
                </router-link>
              </button>

              <label class="p-1" for="">Ainda não tem uma conta ? Realize um</label>
              <router-link to="/register">
                <u><a><b>novo cadastro</b></a></u>
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </div>
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
              } else {
                _showModalBox(
                  "Oops...",
                  "Não foi possível realizar o login, tente novamente mais tarde.",
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
<style scoped>
.logo-head {
  /* border-bottom-right-radius: 30px; */
  /* border-bottom-left-radius: 30px; */
}
.btn-login {
  text-decoration: none;
  color: var(--white-mode-secondary);
}
.btn-login:hover {
  opacity: 0.9;
}
</style>