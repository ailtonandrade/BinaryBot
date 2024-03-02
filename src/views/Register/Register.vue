<template>
  <CardBox :title="title" :description="description"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: 'Registrar Perfil', link: 'CreateUser' }]">
    <div class="d-flex flex-wrap justify-content-md-center col-12 mt-3 mb-3">
      <section class="col-lg-6 col-md-6 col-sm-12">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <img v-if="acc?.imgUser" class="col-12 p-0 m-0 perfil-img-edit b-radius-5 b-shadow-2"
            :src="handleImgUser()" />
        </div>
        <div class="row d-flex align-center justify-content-end">
          <div class="col-12">
            <div class="col-12 d-flex justify-content-center">
              <div class="btn p-0 m-0 upload-input">
                <input id="upload" hidden type="file" @input="uploadFile($event)" />
                <label class="btn d-flex align-center decoration-primary b-radius-5 b-shadow-2 upload-label" for="upload">
                  <font-awesome-icon v-if="acc.imgUser" class="px-2" icon="fa-regular fa-edit"
                    size="1x"></font-awesome-icon>
                  <font-awesome-icon v-else class="px-2" icon="fa-solid fa-plus" size="1x"></font-awesome-icon>
                </label>
              </div>
              <div v-if="acc.imgUser" class="btn p-0 m-0 remove-input">
                <input id="remove" hidden />
                <label class="btn d-flex align-center danger b-radius-5 b-shadow-2" for="remove">
                  <font-awesome-icon class="px-2" icon="fa-regular fa-trash-alt" size="1x"></font-awesome-icon>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="col-lg-6 col-md-12 col-sm-12">
        <form>
          <section class="d-flex flex-wrap">
            <!-- Nome Completo -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
              <div class="form-control">
                <div class="d-flex">
                  <div class="col-12">
                    <label for="name" class="form-label-text">Nome Completo:</label>
                    <input type="text" id="name" class="input-text" v-model="acc.Name" @change="validateName()"
                      placeholder="Seu Nome Compleeto" />
                  </div>
                  <div class="box-error">
                    <span class="textError">{{ error.Name }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Data Nascimento -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
              <div class="form-control">
                <div class="d-flex flex-column">
                  <div class="col-12">
                    <label for="birthday" class="form-label-text">Data de Nascimento:</label>
                    <input type="date" id="birthday" class="input-text" v-model="acc.Birthday"
                      @blur="validateBirthday()" placeholder="01/01/1970" />
                  </div>
                </div>
              </div>
              <div class="box-error">
                <span class="textError">{{ error.Birthday }}</span>
              </div>
            </div>
          </section>
          <section class="d-flex flex-wrap">
            <!-- Usuário -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
              <div class="form-control">
                <div class="d-flex">
                  <div class="col-12">
                    <label for="usuario" class="form-label-text">Usuário:</label>
                    <input type="text" id="UserName" class="input-text" v-model="acc.UserName" @change="validateUserName()"
                      placeholder="usuari011011" />
                  </div>
                  <div class="box-error">
                    <span class="textError">{{ error.UserName }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Email -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
              <div class="form-control">
                <div class="d-flex flex-column">
                  <div class="col-12">
                    <label for="email" class="form-label-text">Email:</label>
                    <input type="text" id="email" class="input-text" v-model="acc.Email"
                      @change="validateEmail()" placeholder="user@mail.com" />
                  </div>
                </div>
              </div>
              <div class="box-error">
                <span class="textError">{{ error.Email }}</span>
              </div>
            </div>
          </section>
          <section class="d-flex flex-wrap">
            <!-- Document -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
              <div class="form-control">
                <div class="d-flex">
                  <div class="col-12">
                    <label for="document" class="form-label-text">Documento:</label>
                    <input type="text" id="Document" class="input-text" v-model="acc.Document"
                      @change="validateDocument()" placeholder="012345678901" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Telefone -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
              <div class="form-control">
                <div class="d-flex">
                  <div class="col-12">
                    <label for="Phone" class="form-label-text">Telefone/Celular:</label>
                    <input type="text" id="Phone" class="input-text" v-model="acc.Phone" @change="validatePhone()"
                      placeholder="01191234567" />
                  </div>
                  <div class="box-error">
                    <span class="textError">{{ error.Phone }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="d-flex flex-wrap">
            <!-- País -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
              <div class="d-flex flex-column form-control">
                <div class="d-flex flex-row">
                  <div class="col-3">
                    <label class="form-label-text">País:</label>
                  </div>
                  <div class="col-9 form-control d-flex flex-column">
                    <input type="text" id="country" v-model="acc.Country" class="form-control b-shadow-2" list="countries"
                      @change="validateCountry()" />
                    <datalist id="countries">
                      <option value="USA">USA</option>
                      <option value="BRA">BRAZIL</option>
                    </datalist>
                  </div>
                </div>
                <div v-if="error.Country" class="box-error">
                  <span class="textError">{{ error.Country }}</span>
                </div>
              </div>
            </div>
            <!-- CEP -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
              <div class="form-control">
                <div class="d-flex">
                  <div class="col-12">
                    <label for="ZipCode" class="form-label-text">CEP:</label>
                    <input type="text" id="ZipCode" class="input-text" v-model="acc.ZipCode" @change="validateZipCode()"
                      placeholder="23230231" />
                  </div>
                  <div v-if="error.ZipCode" class="box-error">
                    <span class="textError">{{ error.ZipCode }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="d-flex flex-wrap">
            <!-- Endereço -->
            <div class="col-lg-6 col-md-6 col-12 mb-1">
              <div class="form-control">
                <div class="d-flex">
                  <div class="col-12">
                    <label for="Endereco" class="form-label-text">Endereço:</label>
                    <input type="text" id="Endereco" class="input-text" v-model="acc.Address" @change="validateAddress()"
                      placeholder="Broadway avenue" />
                  </div>
                  <div v-if="error.Address" class="box-error">
                    <span class="textError">{{ error.Address }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Complemento -->
            <div class="col-lg-6 col-md-6 col-12 mb-1">
              <div class="form-control">
                <div class="d-flex">
                  <div class="col-12">
                    <label for="Complemento" class="form-label-text">Complemento:</label>
                    <input type="text" id="Complemento" class="input-text" v-model="acc.ComplementAddress"
                      placeholder="" />
                  </div>
                  <div v-if="error.ComplementAddress" class="box-error">
                    <span class="textError">{{ error.ComplementAddress }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
                  <label for="password-confirm" class="form-label-text">Confirmar Senha:</label>
                  <input :type="showPassword ? 'text' : 'password'" id="password-confirm" class="input-text"
                    v-model="acc.ConfirmPassword" placeholder="c0nfirm p@ssw0rd" @change="validateConfirmPassword()" />
                </div>
                <div class="col-2 d-flex justify-center">
                </div>
              </div>
            </div>
            <span class="textError">{{ error.ConfirmPassword }}</span>
          </div>

          <div class="mb-6 mt-4 d-flex justify-content-center">
            <button type="button" class="btn decoration-primary" @click="register()" :disabled="!canRegister">
              Salvar alterações
            </button>
          </div>
        </form>
      </section>
    </div>
  </CardBox>
</template>

<script>
import { ref, inject, watch, reactive, toRefs, computed } from "vue";
import AccountService from "@/services/AccountService";
import CardBox from "@/views/components/Layout/CardBox.vue";
import auxiliar from "@/global/auxiliar";
import { useRouter } from "vue-router";
import ObjectUtils from "@/Utils/ObjectUtils";

export default {
  components: { CardBox },
  setup() {
    const title = ref("Cadastro");
    const description = ref("Registrando uma nova conta");
    const addMessageBox = inject("addMessageBox");
    const showPassword = ref(false);
    const router = useRouter();
    const canRegister = computed(() => {
      console.log(acc.value)
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
    });
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
      imgUser: "img/img-user-blank.png",
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
        if (canRegister.value) {
          AccountService.register(acc.value)
            .then(() => {
              addMessageBox(
                "Ok...",
                "Registro efetuado com sucesso.",
                null,
                "success",
                null
              );
              router.goTo("dashboard");
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
      handleImgUser() {
        if (acc?.value?.imgUser === ObjectUtils.getImgBlank()) {
          return require("@/assets/" + acc?.value.imgUser);
        }
        return ObjectUtils.getImgFromBytes(acc?.value.imgUser);
      },
      uploadFile(event) {
        const files = event.target.files;
        if (files.length > 0) {
          const file = files[0];

          const fileReader = new FileReader();
          fileReader.onload = () => {
            acc.value.imgUser = fileReader?.result;
          };
          fileReader.readAsDataURL(file);
        } else {
          console.log("Nenhum arquivo selecionado");
        }
      },
    });

    watch(acc.value, (newV, oldV) => {
      methods.formatInput();
    });

    return {
      acc,
      error,
      title,
      canRegister,
      description,
      showPassword,
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