<template>
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12">
      <form>

        <!-- Nome Completo -->
        <div class="col-sm-12 mb-1">
          <div class="form-control">
            <div class="d-flex">
              <div class="col-12">
                <label for="usuario" class="form-label-text">Nome Completo:</label>
                <input type="text" id="name" class="input-text" v-model="user.Name" @change="validateName()"
                  placeholder="usuari011011" />
              </div>
              <div class="box-error">
                <span class="textError">{{ error.Name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-wrap">
          <!-- Data Nascimento -->
          <div class="col-lg-6 col-md-6 col-12 mb-1">
            <div class="form-control">
              <div class="d-flex">
                <div class="col-12">
                  <label for="usuario" class="form-label-text">Data de Nascimento:</label>
                  <input type="date" id="birthday" class="input-text" v-model="user.Birthday" @change="validateBirthday()"
                    placeholder="01/01/1970" />
                </div>
                <div class="box-error">
                  <span class="textError">{{ error.Birthday }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Document -->
          <div class="col-lg-6 col-md-6 col-12 mb-1">
            <div class="form-control">
              <div class="d-flex">
                <div class="col-12">
                  <label for="usuario" class="form-label-text">Documento:</label>
                  <input type="text" id="Document" class="input-text" v-model="user.Document" @change="validateDocument()"
                    placeholder="01/01/1970" />
                </div>
                <div class="box-error">
                  <span class="textError">{{ error.Document }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-wrap align-center">
          <!-- Telefone -->
          <div class="col-lg-6 col-md-6 col-12 mb-1">
            <div class="form-control">
              <div class="d-flex">
                <div class="col-12">
                  <label for="usuario" class="form-label-text">Telefone/Celular:</label>
                  <input type="text" id="Phone" class="input-text" v-model="user.Phone" @change="validatePhone()"
                    placeholder="01/01/1970" />
                </div>
                <div class="box-error">
                  <span class="textError">{{ error.Phone }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- País -->
          <div class="col-lg-6 col-md-6 col-12 mb-1">
            <div class="form-control">
              <div class="d-flex">
                <div class="col-3">
                  <label for="usuario" class="form-label-text">País:</label>
                </div>
                <div class="box-error">
                  <span class="textError">{{ error.Country }}</span>
                </div>
                <div class="col-9">
                  <select type="text" class="form-control" id="country" v-model="user.Country"
                    @change="validateCountry()">
                    <option selected :value="user.Country">{{ user.Country }}</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-wrap align-center">
          <!-- CEP -->
          <div class="col-lg-6 col-md-6 col-12 mb-1">
            <div class="form-control">
              <div class="d-flex">
                <div class="col-12">
                  <label for="usuario" class="form-label-text">CEP:</label>
                  <input type="text" id="ZipCode" class="input-text" v-model="user.ZipCode" @change="validateZipCode()"
                    placeholder="23230231" />
                </div>
                <div class="box-error">
                  <span class="textError">{{ error.ZipCode }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Complemento -->
          <div class="col-lg-6 col-md-6 col-12 mb-1">
            <div class="form-control">
              <div class="d-flex">
                <div class="col-12">
                  <label for="usuario" class="form-label-text">Complemento:</label>
                  <input type="text" id="Complemento" class="input-text" v-model="user.ComplementAddress"
                    placeholder="" />
                </div>
                <div class="box-error">
                  <span class="textError"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Endereço -->
        <div class="col-12 mb-1">
          <div class="form-control">
            <div class="d-flex">
              <div class="col-12">
                <label for="usuario" class="form-label-text">Endereço:</label>
                <input type="text" id="Endereço" class="input-text" v-model="user.Address" @change="validateAddress()"
                  placeholder="01/01/1970" />
              </div>
              <div class="box-error">
                <span class="textError">{{ error.Address }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Pass -->
        <div class="mb-1">
          <div class="col-12">
            <div class="form-control">
              <div class="d-flex align-center justify-center">
                <div class="col-10">
                  <label for="password" class="form-label-text">Senha:</label>
                  <input :type="showPassword ? 'text' : 'password'" id="password" class="input-text"
                    v-model="user.Password" placeholder="p@ssw0rd" @change="validatePassword()" />
                </div>
                <div class="col-2 d-flex justify-center">
                  <button @click.prevent="showPassword = !showPassword" class="showHide">
                    {{ showPassword ? "#" : "@" }}
                  </button>
                </div>
              </div>
            </div>
            <span class="textError">{{ error.Password }}</span>
          </div>
        </div>
        <div class="col-12">
          <div class="form-control">
            <div class="d-flex align-center justify-center">
              <div class="col-10">
                <label for="password" class="form-label-text">Confirmar Senha:</label>
                <input :type="showPassword ? 'text' : 'password'" id="password" class="input-text"
                  v-model="user.ConfirmPassword" placeholder="c0nfirm p@ssw0rd" @change="validateConfirmPassword()" />
              </div>
              <div class="col-2 d-flex justify-center">
              </div>
            </div>
          </div>
          <span class="textError">{{ error.ConfirmPassword }}</span>
        </div>

        <div class="mb-6 mt-4 d-flex justify-content-center">
          <button type="button" class="btn btn-primary" @click="edit()" :disabled="!canEdit()">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
    <div class="col-6"></div>
  </div>
</template>

<script>
import { ref, inject, watch, onMounted, reactive, toRefs } from "vue";
import AccountService from "../../../services/AccountService";
import auxiliar from "../../../global/auxiliar";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("Meus dados");
    const description = ref("Editando seu perfil");
    const router = useRouter();
    const _addMessageBox = inject("addMessageBox");
    const canEdit = ref(false);
    const showPassword = ref(false);
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
          AccountService.edit(user.value)
            .then(() => {
              _addMessageBox(
                "Ok...",
                "Edição efetuada com sucesso.",
                null,
                "success",
                null
              );
            })
            .catch((ex) => {
              _addMessageBox(
                "Oops...",
                "Não foi possível prosseguir com a edição do perfil. Tente novamente mais tarde.",
                null,
                "danger",
                null
              );
            });
        }
      },
      formatInput() {
        methods.clearErrors();
        user.value.Name =
          user.value.Name ?? auxiliar.formatOnlyChars(user.value.Name);
        user.value.Document =
          user.value.Document ?? auxiliar.formatToDoc(user.value.Document);
        user.value.Phone =
          user.value.Phone ?? auxiliar.formatToPhone(user.value.Phone);
        user.value.ZipCode =
          user.value.ZipCode ??
          auxiliar.formatOnlyCharsAndNumbers(user.value.ZipCode);
        user.value.Country =
          user.value.Country ?? auxiliar.formatOnlyChars(user.value.Country);
        user.value.Address =
          user.value.Address ??
          auxiliar.formatOnlyCharsNumbersAndWhiteSpace(user.value.Address);
        user.value.ComplementAddress =
          user.value.ComplementAddress ??
          auxiliar.formatOnlyCharsNumbersAndWhiteSpace(
            user.value.ComplementAddress
          );
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
          new Date().getFullYear() -
          new Date(user.value.Birthday).getFullYear();
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
        } else if (auxiliar.validateDocCharMatches(user.value.Document) > 1) {
          error.value.Document =
            "Preencha corretamente o campo com um CPF válido.\n";
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
        } else if (
          user.value.Phone.length > 0 &&
          user.value.Phone.length < 14
        ) {
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
      responseData(data) {
        user.value.Id = data.id;
        user.value.UserName = data.userName;
        user.value.Address = data.address;
        user.value.Birthday = new Date(data.birthday).toISOString().split("T")[0];
        user.value.ComplementAddress = data.complementAddress;
        user.value.Country = data.country;
        user.value.Document = data.document;
        user.value.Email = data.email;
        user.value.Name = data.name;
        user.value.Phone = data.phone;
        user.value.ZipCode = data.zipCode;
      },
    });

    onMounted(() => {
      AccountService.getInfoUser()
        .then((response) => {
          methods.responseData(response.data.result);
        })
        .catch((ex) => {
        });
    });
    watch(user.value, (newV, oldV) => {
      methods.formatInput();
      methods.canEdit();
    });

    return {
      title,
      description,
      user,
      showPassword,
      canEdit,
      error,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped>
.form-label-text {
  font-size: 8pt;
}

.input-text {
  font-size: 9pt;
}

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