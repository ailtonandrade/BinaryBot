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
                <label for="name" class="form-label">Nome Completo:</label>
                <input type="text" class="form-control" id="name" v-model="acc.Name" @change="methods.validateName()" />
                <div class="box-error">
                  <span class="textError">{{ error.Name }}</span>
                </div>
              </div>
              <div class="mb-6">
                <label for="usuario" class="form-label">Usuário:</label>
                <input type="text" class="form-control" id="username" v-model="acc.UserName"
                  @change="methods.validateUserName()" />
                <span class="textError">{{ error.UserName }}</span>
              </div>
              <div class="mb-6">
                <label for="birthday" class="form-label">Data de Nascimento:</label>
                <input type="date" class="form-control" id="birthday" v-model="acc.Birthday"
                  @change="methods.validateBirthday()" />
                <span class="textError">{{ error.Birthday }}</span>
              </div>
              <div class="mb-6">
                <label for="document" class="form-label">CPF:</label>
                <input type="text" class="form-control" id="document" v-model="acc.Document" :maxlength="14"
                  @change="methods.validateDocument()" />
                <span class="textError">{{ error.Document }}</span>
              </div>
              <div class="mb-6">
                <label for="phone" class="form-label">Telefone/Celular:</label>
                <input type="text" class="form-control" id="phone" v-model="acc.Phone" :maxlength="15"
                  @change="methods.validatePhone()" />
                <span class="textError">{{ error.Phone }}</span>
              </div>
              <div class="mb-6">
                <label for="email" class="form-label">Email:</label>
                <input type="text" class="form-control" id="email" v-model="acc.Email"
                  @change="methods.validateEmail()" />
                <span class="textError">{{ error.Email }}</span>
              </div>
              <div class="mb-6">
                <label for="zipcode" class="form-label">CEP:</label>
                <input type="text" class="form-control" id="zipcode" v-model="acc.ZipCode"
                  @change="methods.validateZipCode()" />
                <span class="textError">{{ error.ZipCode }}</span>
              </div>
              <div class="mb-6">
                <label for="country" class="form-label">País:</label>
                <input type="text" class="form-control" id="country" v-model="acc.Country"
                  @change="methods.validateCountry()" />
                <span class="textError">{{ error.Country }}</span>
              </div>
              <div class="mb-6">
                <label for="address" class="form-label">Endereço:</label>
                <input type="text" class="form-control" id="address" v-model="acc.Address"
                  @change="methods.validateAddress()" />
                <span class="textError">{{ error.Address }}</span>
              </div>
              <div class="mb-6">
                <label for="complement-address" class="form-label">Complemento:</label>
                <input type="text" class="form-control" id="complement-address" v-model="acc.ComplementAddress" />
              </div>
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
                <button type="button" class="btn btn-primary" @click="methods.register()"
                  :disabled="!methods.canRegister()">
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
      Name: "",
      UserName: "",
      Birthday: "",
      Document: "",
      Phone: "",
      Email: "",
      Password: "",
      ZipCode: "",
      Country: "",
      Address: "",
      ComplementAddress: "",
      ConfirmPassword: "",
    });
    const error = ref({
      Name: "",
      UserName: "",
      Birthday: "",
      Document: "",
      Phone: "",
      Email: "",
      ZipCode: "",
      Country: "",
      Address: "",
      ComplementAddress: "",
      Password: "",
      ConfirmPassword: "",
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