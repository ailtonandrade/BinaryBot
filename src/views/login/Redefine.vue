<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <form>
      <div class="mb-6">
        <label for="password" class="form-label">Senha:</label>
        <input type="password" class="form-control" id="password" v-model="acc.Password"
          @change="methods.validatePassword()" />
        <span class="textError">{{ error.Password }}</span>
      </div>
      <div class="mb-6">
        <label for="confirmPassword" class="form-label">Confirme sua senha:</label>
        <input type="password" class="form-control" id="confirmPassword" v-model="acc.ConfirmPassword"
          @change="methods.validateConfirmPassword()" />
        <span class="textError">{{ error.ConfirmPassword }}</span>
      </div>
      <div class="mb-6 mt-4 d-flex justify-content-center">
        <button type="button" class="btn btn-primary" @click="methods.register()" :disabled="!methods.canRegister()">
          Redefinir
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import AuthService from "../../services/AuthService";
import { useRouter } from "vue-router";
import auxiliar from "../../global/auxiliar";

export default {
  setup() {
    const title = ref("Recuperação de senha");
    const description = ref(
      "Insira seu email ou seu nome de usuário para recuperar o seu cadastro."
    );
    const acc = ref({
      Password: "",
      ConfirmPassword: "",
    });
    const error = ref({
      Password: "",
      ConfirmPassword: "",
      UrlMatch: "",
    });
    const router = useRouter();
    const methods = {
      register() {
        if (methods.canRegister()) {
          AuthService.redefine(acc.value)
            .then(() => {
              alert("Redefinição efetuada com sucesso.");
              router.push("/");
            })
            .catch((err) => {
            });
        }
      },
      formatInput() {
        acc.value.Password = acc.value.Password.replaceAll(" ", "");
        acc.value.ConfirmPassword = acc.value.ConfirmPassword.replaceAll(
          " ",
          ""
        );
      },
      clearErrors() {
        error.value.Password = "";
        error.value.ConfirmPassword = "";
      },
      validatePassword() {
        if (acc.value.Password.length == 0) {
          error.value.Password = "Campo obrigatório.\n";
        } else if (
          acc.value.Password.length > 0 &&
          acc.value.Password.length < 8
        ) {
          error.value.Password = "Senha deve conter ao menos 8 caracteres.\n";
        } else if (!auxiliar.validate(acc.value.Password)) {
          error.value.Password =
            "Senha deve conter letras maiúsculas, minúsculas, caracteres especiais e números.\n";
        } else {
          error.value.Password = "";
        }
      },
      validateConfirmPassword() {
        if (acc.value.ConfirmPassword.length == 0) {
          error.value.ConfirmPassword = "Campo obrigatório.\n";
        } else if (acc.value.Password !== acc.value.ConfirmPassword) {
          error.value.ConfirmPassword = "Senhas não coincidem.";
        } else if (!auxiliar.validate(acc.value.ConfirmPassword)) {
          error.value.ConfirmPassword =
            "Senha deve conter letras maiúsculas, minúsculas, caracteres especiais e números.\n";
        } else {
          error.value.ConfirmPassword = "";
        }
      },
      canRegister() {
        if (
          error.value.Password.trim() == "" &&
          error.value.ConfirmPassword.trim() == "" &&
          acc.value.Password.trim() != "" &&
          acc.value.ConfirmPassword.trim() != ""
        ) {
          return true;
        }
        return false;
      },
    };

    watch(acc.value, (newV, oldV) => {
      methods.formatInput();
      methods.canRegister();
    });
    return {
      title,
      description,
      acc,
      error,
      methods,
    };
  },
};
</script>
