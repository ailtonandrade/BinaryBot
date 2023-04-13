<template>
  <div class="row">
    <div class="container-fluid">
      <div class="d-flex card-header">
        <div class="col-6">
          <span>{{ title }}</span>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <router-link to="/">
            <a>Voltar</a>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form>
              <div class="mb-6">
                <label for="usuario" class="form-label">Nome Completo:</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="acc.Name"
                />
              </div>
              <div class="mb-6">
                <label for="usuario" class="form-label">Usuário:</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="acc.UserName"
                />
              </div>
              <div class="mb-6">
                <label for="usuario" class="form-label"
                  >Data de Nascimento:</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="birthday"
                  v-model="acc.Birthday"
                />
              </div>
              <div class="mb-6">
                <label for="document" class="form-label">CPF:</label>
                <input
                  type="text"
                  class="form-control"
                  id="document"
                  v-model="acc.Document"
                />
              </div>
              <div class="mb-6">
                <label for="phone" class="form-label">Telefone/Celular:</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  v-model="acc.Phone"
                />
              </div>
              <div class="mb-6">
                <label for="email" class="form-label">Email:</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  v-model="acc.Email"
                />
              </div>
              <div class="mb-6">
                <label for="password" class="form-label">Senha:</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="acc.Password"
                />
              </div>
              <div class="mb-6">
                <label for="confirmPassword" class="form-label"
                  >Confirme sua senha:</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="acc.ConfirmPassword"
                />
              </div>
              <div class="mb-6 mt-4 d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="methods.register()"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import AuthService from "../../services/AuthService";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("Cadastro");
    const description = ref("Registrando uma nova conta");
    const router = useRouter();
    const acc = ref({
      Name: "",
      UserName: "",
      Birthday: "",
      Document: "",
      Phone: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    });
    const methods = {
      register() {
        AuthService.register(acc.value)
          .then((response) => {
            alert("Registro efetuado com sucesso.");
            router.push("/"); 
            console.log(response);
          })
          .catch((err) => {
            console.log(err.message);
          });
      },
    };

    return {
      title,
      description,
      acc,
      methods,
    };
  },
};
</script>

<style scoped>
</style>