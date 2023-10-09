<template>
  <CardBox :title="title" :description="description"
    :breadcrumb="[{ name: 'Dashboard', link: '' }, { name: 'Registrar Perfil', link: 'listUsers' }]">
    <div class="row">
      <div class="container-fluid">
        <div class="col-12">
          <form>
            <!-- Nome Completo -->
            <div class="col-sm-12 mb-1">
              <div class="form-control">
                <div class="d-flex">
                  <div class="col-12">
                    <label for="usuario" class="form-label-text">Nome Completo:</label>
                    <input type="text" id="name" class="input-text" v-model="acc.Name" @change="validateName()"
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
                      <input type="date" id="birthday" class="input-text" v-model="acc.Birthday"
                        @change="validateBirthday()" placeholder="01/01/1970" />
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
                      <input type="text" id="Document" class="input-text" v-model="acc.Document"
                        @change="validateDocument()" placeholder="01/01/1970" />
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
                      <input type="text" id="Phone" class="input-text" v-model="acc.Phone" @change="validatePhone()"
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
                      <select type="text" class="form-control" id="country" v-model="acc.Country"
                        @change="validateCountry()">
                        <option selected :value="acc.Country">{{ acc.Country }}</option>
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
                      <input type="text" id="ZipCode" class="input-text" v-model="acc.ZipCode" @change="validateZipCode()"
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
                      <input type="text" id="Complemento" class="input-text" v-model="acc.ComplementAddress"
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
                    <input type="text" id="Endereço" class="input-text" v-model="acc.Address" @change="validateAddress()"
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
                        v-model="acc.Password" placeholder="p@ssw0rd" @change="validatePassword()" />
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
                      v-model="acc.ConfirmPassword" placeholder="c0nfirm p@ssw0rd" @change="validateConfirmPassword()" />
                  </div>
                  <div class="col-2 d-flex justify-center">
                  </div>
                </div>
              </div>
              <span class="textError">{{ error.ConfirmPassword }}</span>
            </div>
            <div class="mb-6 mt-4 d-flex justify-content-center">
              <button type="button" class="btn btn-primary" @click="register()" :disabled="!canRegister()">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </CardBox>
</template>

<script>
import { ref, inject, watch, reactive, toRefs } from "vue";
import AccountService from "../../services/AccountService";
import CardBox from "./../components/Layout/CardBox.vue";
import auxiliar from "../../global/auxiliar";
import { useRouter } from "vue-router";

export default {
  components: { CardBox },
  setup() {
    const title = ref("Cadastro");
    const description = ref("Registrando uma nova conta");
    const _addMessageBox = inject("addMessageBox");
    const router = useRouter();
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

    const methods = reactive({
      register() {
        if (methods.canRegister()) {
          AccountService.register(acc.value)
            .then(() => {
              _addMessageBox(
                "Ok...",
                "Registro efetuado com sucesso.",
                null,
                "success",
                null
              );
              router.push("/");
            })
            .catch((err) => {
            });
        }
      },
      formatInput() {
        acc.value.Name = auxiliar.formatOnlyChars(acc.value.Name);
        acc.value.UserName = auxiliar.formatOnlyCharsAndNumbers(
          acc.value.UserName
        );
        acc.value.Document = auxiliar.formatToDoc(acc.value.Document);
        acc.value.Email = acc.value.Email.replace(" ", "");
        acc.value.Phone = auxiliar.formatToPhone(acc.value.Phone);
        acc.value.ZipCode = auxiliar.formatOnlyCharsAndNumbers(acc.value.ZipCode);
        acc.value.Country = auxiliar.formatOnlyChars(acc.value.Country);
        acc.value.Address = auxiliar.formatOnlyCharsNumbersAndWhiteSpace(acc.value.Address);
        acc.value.ComplementAddress = auxiliar.formatOnlyCharsNumbersAndWhiteSpace(acc.value.ComplementAddress);
        acc.value.Password = acc.value.Password.replace(" ", "");
        acc.value.ConfirmPassword = acc.value.ConfirmPassword.replace(
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
        if (acc.value.UserName?.length > 0 && acc.value.UserName?.length < 8) {
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
        if (acc.value.Country.length > 0 && acc.value.Country.length < 2) {
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
          error.value.Name?.trim() == "" &&
          error.value.UserName?.trim() == "" &&
          //error.value.Document?.trim() == "" &&
          error.value.Email?.trim() == "" &&
          error.value.Phone?.trim() == "" &&
          error.value.Birthday?.trim() == "" &&
          error.value.Password?.trim() == "" &&
          error.value.ConfirmPassword?.trim() == "" &&
          acc.value.Name?.trim() != "" &&
          acc.value.UserName?.trim() != "" &&
          //acc.value.Document?.trim() != "" &&
          acc.value.Email?.trim() != "" &&
          acc.value.Phone?.trim() != "" &&
          acc.value.Birthday?.trim() != "" &&
          acc.value.Password?.trim() != "" &&
          acc.value.ConfirmPassword?.trim() != ""
        ) {
          return true;
        }
        return false;
      },
    });

    watch(acc.value, (newV, oldV) => {
      methods.formatInput();
      methods.canRegister();
    });

    return {
      title,
      description,
      acc,
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