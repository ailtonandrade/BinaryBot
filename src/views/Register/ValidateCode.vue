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
                <label for="code" class="form-label">Código de Validação</label>
                <input type="text" class="form-control" id="name" v-model="acc.Code" @change="methods.validateCode()" />
                <div class="box-error">
                  <span class="textError">{{ error.Name }}</span>
                </div>
              </div>
              
              <div class="mb-6 mt-4 d-flex justify-content-center">
                <button type="button" class="btn btn-primary" @click="methods.register()"
                  :disabled="!methods.canRegister()">
                  Validar
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
import { ref, watch } from "vue";
import AuthService from "../../services/AuthService";
import auxiliar from "../../global/auxiliar";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("Cadastro");
    const description = ref("Registrando uma nova conta");
    const router = useRouter();
    const canRegister = ref(false);
    const acc = ref({
      NCodeame: "",
    });
    const error = ref({
      Code: "",
    });

    const methods = {
      register() {
        if (methods.canRegister()) {
          AuthService.register(acc.value)
            .then(() => {
              alert("Registro efetuado com sucesso.");
              router.push("/");
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      },
      formatInput() {
        acc.value.Name = auxiliar.formatOnlyChars(acc.value.Name);
        acc.value.UserName = auxiliar.formatOnlyCharsAndNumbers(
          acc.value.UserName
        );
        acc.value.Document = auxiliar.formatToDoc(acc.value.Document);
        acc.value.Email = acc.value.Email.replaceAll(" ", "");
        acc.value.Phone = auxiliar.formatToPhone(acc.value.Phone);
        acc.value.ZipCode = auxiliar.formatOnlyCharsAndNumbers(acc.value.ZipCode);
        acc.value.Country = auxiliar.formatOnlyChars(acc.value.Country);
        acc.value.Address = auxiliar.formatOnlyCharsNumbersAndWhiteSpace(acc.value.Address);
        acc.value.ComplementAddress = auxiliar.formatOnlyCharsNumbersAndWhiteSpace(acc.value.ComplementAddress);
        acc.value.Password = acc.value.Password.replaceAll(" ", "");
        acc.value.ConfirmPassword = acc.value.ConfirmPassword.replaceAll(
          " ",
          ""
        );
      },
      clearErrors() {
        error.value.Name = "";
        error.value.UserName = "";
        error.value.Document = "";
        error.value.Email = "";
        error.value.Phone = "";
        error.value.Birthday = "";
        error.value.ZipCode = "";
        error.value.Country = "";
        error.value.Address = "";
        error.value.ComplementAddress = "";
        error.value.Password = "";
        error.value.ConfirmPassword = "";
      },
      validateName() {
        if (acc.value.Name.length > 0 && acc.value.Name.length < 8) {
          error.value.Name =
            "Este campo pode não estar preenchido corretamente.\n";
        } else if (acc.value.Name.length == 0) {
          error.value.Name = "Campo obrigatório.\n";
        } else {
          error.value.Name = "";
        }
      },
      validateUserName() {
        if (acc.value.UserName.length > 0 && acc.value.UserName.length < 8) {
          error.value.UserName =
            "Nome de usuário precisa ter ao menos 8 caracteres.\n";
        } else if (acc.value.UserName.length == 0) {
          error.value.UserName = "Campo obrigatório.\n";
        } else {
          error.value.UserName = "";
        }
      },
      validateBirthday() {
        const now =
          new Date().getFullYear() - new Date(acc.value.Birthday).getFullYear();
        if (acc.value.Birthday == null) {
          error.value.Birthday = "Campo obrigatório.\n";
        } else if (now > 100) {
          error.value.Birthday = "Insira uma data válida.\n";
        } else if (now < 19) {
          error.value.Birthday =
            "O usuário precisa ter ao menos 18 anos de idade.\n";
        } else {
          error.value.Birthday = "";
        }
      },
      validateDocument() {

        if (acc.value.Document.length == 0) {
          error.value.Document = "Campo obrigatório.\n";
        } else if (
          auxiliar.validateDocCharMatches(acc.value.Document) > 1
        ) {
          error.value.Document = "Preencha corretamente o campo com um CPF válido.\n";
        } else if (
          acc.value.Document.length > 0 &&
          acc.value.Document.length < 13 &&
          acc.value.Document.toLowerCase().endsWith("x")
        ) {
          error.value.Document = "Preencha corretamente o campo com seu CPF.\n";
        } else if (
          acc.value.Document.length > 0 &&
          acc.value.Document.length < 14 &&
          !acc.value.Document.toLowerCase().endsWith("x")
        ) {
          error.value.Document = "Preencha corretamente o campo com seu CPF.\n";
        } else {
          error.value.Document = "";
        }
      },
      validatePhone() {
        if (acc.value.Phone.length == 0) {
          error.value.Phone = "Campo obrigatório.\n";
        } else if (acc.value.Phone.length > 0 && acc.value.Phone.length < 14) {
          error.value.Phone =
            "Preencha corretamente o campo com seu Telefone/Celular.\n";
        } else {
          error.value.Phone = "";
        }
      },
      validateEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (acc.value.Email.length == 0) {
          error.value.Email = "Campo obrigatório.\n";
        } else if (!regex.test(acc.value.Email)) {
          error.value.Email = "Informe um email válido";
        } else {
          error.value.Email = "";
        }
      },
      validateZipCode() {
        if (acc.value.ZipCode.length > 0 && acc.value.ZipCode.length < 5) {
          error.value.ZipCode =
            "Zip code ou CEP precisa ter ao menos 5 caracteres.\n";
        } else if (acc.value.ZipCode.length == 0) {
          error.value.ZipCode = "Campo obrigatório.\n";
        } else {
          error.value.ZipCode = "";
        }
      },
      validateCountry() {
        if (acc.value.Country.length > 0 && acc.value.Country.length < 3) {
          error.value.Country =
            "Este campo pode não estar preenchido corretamente.\n";
        } else if (acc.value.Country.length == 0) {
          error.value.Country = "Campo obrigatório.\n";
        } else {
          error.value.Country = "";
        }
      },
      validateAddress() {
        if (acc.value.Address.length == 0) {
          error.value.Address = "Campo obrigatório.\n";
        } else {
          error.value.Address = "";
        }
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
          error.value.Name.trim() == "" &&
          error.value.UserName.trim() == "" &&
          error.value.Document.trim() == "" &&
          error.value.Email.trim() == "" &&
          error.value.Phone.trim() == "" &&
          error.value.Birthday.trim() == "" &&
          error.value.Password.trim() == "" &&
          error.value.ConfirmPassword.trim() == "" &&
          acc.value.Name.trim() != "" &&
          acc.value.UserName.trim() != "" &&
          acc.value.Document.trim() != "" &&
          acc.value.Email.trim() != "" &&
          acc.value.Phone.trim() != "" &&
          acc.value.Birthday.trim() != "" &&
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
      canRegister,
      error,
      methods,
    };
  },
};
</script>

<style scoped>
.textError {
  color: rgb(155, 57, 57);
  font-size: 7pt;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.box-error {
  height: 18px;
}
</style>