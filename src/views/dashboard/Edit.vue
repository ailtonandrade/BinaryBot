<template>
  <div>
    <Menu></Menu>
  </div>
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
                <input type="text" class="form-control" id="name" v-model="user.Name" @change="methods.validateName()" />
                <div class="box-error">
                  <span class="textError">{{ error.Name }}</span>
                </div>
              </div>
              <div class="mb-6">
                <label for="birthday" class="form-label">Data de Nascimento:</label>
                <input type="date" class="form-control" id="birthday" v-model="user.Birthday"
                  @change="methods.validateBirthday()" />
                <span class="textError">{{ error.Birthday }}</span>
              </div>
              <div class="mb-6">
                <label for="document" class="form-label">CPF:</label>
                <input type="text" class="form-control" id="document" v-model="user.Document" :maxlength="14"
                  @change="methods.validateDocument()" />
                <span class="textError">{{ error.Document }}</span>
              </div>
              <div class="mb-6">
                <label for="phone" class="form-label">Telefone/Celular:</label>
                <input type="text" class="form-control" id="phone" v-model="user.Phone" :maxlength="15"
                  @change="methods.validatePhone()" />
                <span class="textError">{{ error.Phone }}</span>
              </div>
              <div class="mb-6">
                <label for="zipcode" class="form-label">CEP:</label>
                <input type="text" class="form-control" id="zipcode" v-model="user.ZipCode"
                  @change="methods.validateZipCode()" />
                <span class="textError">{{ error.ZipCode }}</span>
              </div>
              <div class="mb-6">
                <label for="country" class="form-label">País:</label>
                <input type="text" class="form-control" id="country" v-model="user.Country"
                  @change="methods.validateCountry()" />
                <span class="textError">{{ error.Country }}</span>
              </div>
              <div class="mb-6">
                <label for="address" class="form-label">Endereço:</label>
                <input type="text" class="form-control" id="address" v-model="user.Address"
                  @change="methods.validateAddress()" />
                <span class="textError">{{ error.Address }}</span>
              </div>
              <div class="mb-6">
                <label for="complement-address" class="form-label">Complemento:</label>
                <input type="text" class="form-control" id="complement-address" v-model="user.ComplementAddress" />
              </div>
              <div class="mb-6">
                <label for="password" class="form-label">Senha:</label>
                <input type="password" class="form-control" id="password" v-model="user.Password"
                  @change="methods.validatePassword()" />
                <span class="textError">{{ error.Password }}</span>
              </div>
              <div class="mb-6">
                <label for="confirmPassword" class="form-label">Confirme sua senha:</label>
                <input type="password" class="form-control" id="confirmPassword" v-model="user.ConfirmPassword"
                  @change="methods.validateConfirmPassword()" />
                <span class="textError">{{ error.ConfirmPassword }}</span>
              </div>
              <div class="mb-6 mt-4 d-flex justify-content-center">
                <button type="button" class="btn btn-primary" @click="methods.edit()" :disabled="!methods.canEdit()">
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
import { ref, watch, onMounted, reactive, toRefs } from "vue";
import AuthService from "../../services/AuthService";
import auxiliar from "../../global/auxiliar";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("Meus dados");
    const description = ref("Editando seu perfil");
    const router = useRouter();
    const canEdit = ref(false);
    const user = ref({
      Name: "",
      Birthday: "",
      Document: "",
      Phone: "",
      ZipCode: "",
      Country: "",
      Address: "",
      ComplementAddress: "",
      Password: "",
      ConfirmPassword: "",
    });
    const error = ref({
      Name: "",
      Birthday: "",
      Document: "",
      Phone: "",
      ZipCode: "",
      Country: "",
      Address: "",
      ComplementAddress: "",
      Password: "",
      ConfirmPassword: "",
    });

    const methods = reactive({
      edit() {
        if (methods.canEdit()) {
          AuthService.edit(user.value)
            .then(() => {
              alert("Registro efetuado com sucesso.");
              router.push("/");
            })
            .catch((ex) => {
              alert(ex.response.data);
            });
        }
      },
      formatInput() {
        user.value.Name = user.value.Name ?? auxiliar.formatOnlyChars(user.value.Name);
        user.value.Document = user.value.Document ?? auxiliar.formatToDoc(user.value.Document);
        user.value.Phone = user.value.Phone ?? auxiliar.formatToPhone(user.value.Phone);
        user.value.ZipCode = user.value.ZipCode ?? auxiliar.formatOnlyCharsAndNumbers(user.value.ZipCode);
        user.value.Country = user.value.Country ?? auxiliar.formatOnlyChars(user.value.Country);
        user.value.Address = user.value.Address ?? auxiliar.formatOnlyCharsNumbersAndWhiteSpace(user.value.Address);
        user.value.ComplementAddress = user.value.ComplementAddress ?? auxiliar.formatOnlyCharsNumbersAndWhiteSpace(user.value.ComplementAddress);

      },
      clearErrors() {
        error.value.Name = "";
        error.value.Document = "";
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
        if (user.value.Name.length > 0 && user.value.Name.length < 8) {
          error.value.Name =
            "Este campo pode não estar preenchido corretamente.\n";
        } else if (user.value.Name.length == 0) {
          error.value.Name = "Campo obrigatório.\n";
        } else {
          error.value.Name = "";
        }
      },
      validateBirthday() {
        const now =
          new Date().getFullYear() - new Date(user.value.Birthday).getFullYear();
        if (user.value.Birthday == null) {
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

        if (user.value.Document.length == 0) {
          error.value.Document = "Campo obrigatório.\n";
        } else if (
          auxiliar.validateDocCharMatches(user.value.Document) > 1
        ) {
          error.value.Document = "Preencha corretamente o campo com um CPF válido.\n";
        } else if (
          user.value.Document.length > 0 &&
          user.value.Document.length < 13 &&
          user.value.Document.toLowerCase().endsWith("x")
        ) {
          error.value.Document = "Preencha corretamente o campo com seu CPF.\n";
        } else if (
          user.value.Document.length > 0 &&
          user.value.Document.length < 14 &&
          !user.value.Document.toLowerCase().endsWith("x")
        ) {
          error.value.Document = "Preencha corretamente o campo com seu CPF.\n";
        } else {
          error.value.Document = "";
        }
      },
      validatePhone() {
        if (user.value.Phone.length == 0) {
          error.value.Phone = "Campo obrigatório.\n";
        } else if (user.value.Phone.length > 0 && user.value.Phone.length < 14) {
          error.value.Phone =
            "Preencha corretamente o campo com seu Telefone/Celular.\n";
        } else {
          error.value.Phone = "";
        }
      },
      validateZipCode() {
        if (user.value.ZipCode.length > 0 && user.value.ZipCode.length < 5) {
          error.value.ZipCode =
            "Zip code ou CEP precisa ter ao menos 5 caracteres.\n";
        } else if (user.value.ZipCode.length == 0) {
          error.value.ZipCode = "Campo obrigatório.\n";
        } else {
          error.value.ZipCode = "";
        }
      },
      validateCountry() {
        if (user.value.Country.length > 0 && user.value.Country.length < 3) {
          error.value.Country =
            "Este campo pode não estar preenchido corretamente.\n";
        } else if (user.value.Country.length == 0) {
          error.value.Country = "Campo obrigatório.\n";
        } else {
          error.value.Country = "";
        }
      },
      validateAddress() {
        if (user.value.Address.length == 0) {
          error.value.Address = "Campo obrigatório.\n";
        } else {
          error.value.Address = "";
        }
      },
      validatePassword() {
        if (user.value.Password.length == 0) {
          error.value.Password = "Campo obrigatório.\n";
        } else if (
          user.value.Password.length > 0 &&
          user.value.Password.length < 8
        ) {
          error.value.Password = "Senha deve conter ao menos 8 caracteres.\n";
        } else if (!auxiliar.validate(user.value.Password)) {
          error.value.Password =
            "Senha deve conter letras maiúsculas, minúsculas, caracteres especiais e números.\n";
        } else {
          error.value.Password = "";
        }
      },
      validateConfirmPassword() {
        if (user.value.ConfirmPassword.length == 0) {
          error.value.ConfirmPassword = "Campo obrigatório.\n";
        } else if (user.value.Password !== user.value.ConfirmPassword) {
          error.value.ConfirmPassword = "Senhas não coincidem.";
        } else if (!auxiliar.validate(user.value.ConfirmPassword)) {
          error.value.ConfirmPassword =
            "Senha deve conter letras maiúsculas, minúsculas, caracteres especiais e números.\n";
        } else {
          error.value.ConfirmPassword = "";
        }
      },
      canEdit() {
        if (
          error.value.Name.trim() == "" &&
          error.value.Document.trim() == "" &&
          error.value.Phone.trim() == "" &&
          error.value.Birthday.trim() == "" &&
          error.value.Password.trim() == "" &&
          error.value.ConfirmPassword.trim() == "" &&
          user.value.Name.trim() != "" &&
          user.value.Document.trim() != "" &&
          user.value.Phone.trim() != "" &&
          user.value.Birthday != null &&
          user.value.Password.trim() != "" &&
          user.value.ConfirmPassword.trim() != ""
        ) {
          return true;
        }
        return false;
      },
      responseData(data: any) {
        console.table(data);
        user.value.Name = data.name;
        user.value.Birthday = data.birthday;
        user.value.Phone = data.phone;
        user.value.ZipCode = data.zipCode;
        user.value.Address = data.address;
        user.value.Document = data.document;
        user.value.ComplementAddress = data.complementAddress;
      }
    });

    onMounted(() => {
      AuthService.getInfoUser()
        .then((response) => {
          methods.responseData(response.data);
        })
        .catch((ex) => {
          console.table(ex.data);
        })
    })
    watch(user.value, (newV, oldV) => {
      methods.formatInput();
      methods.canEdit();
    });

    return {
      title,
      description,
      user,
      canEdit,
      error,
      ...toRefs(methods),
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