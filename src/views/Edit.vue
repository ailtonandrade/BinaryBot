<template>
  <CardBox :title="'Meus dados'" :description="'Editando seu perfil'"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: 'Editar Perfil', link: 'edit-perfil' }]">
    <div class="d-flex flex-wrap justify-content-md-center col-12 mt-3 mb-3">
      <section class="col-lg-6 col-md-6 col-sm-12">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <img class="col-12 p-0 m-0 perfil-img-edit perfil-img-edit b-radius-5 b-shadow-2" :src="handleImgUser()" />
        </div>
        <div class="row d-flex align-center justify-content-end">
          <div class="col-12">
            <div class="col-12">
              <div class="btn p-0 m-0 upload-input">
                <input id="upload" hidden type="file" @input="uploadFile($event)" />
                <label class="btn d-flex align-center decoration-primary b-radius-5 b-shadow-2 upload-label" for="upload">
                  <font-awesome-icon v-if="user.imgUser" class="px-2" icon="fa-regular fa-edit"
                    size="1x"></font-awesome-icon>
                  <font-awesome-icon v-else class="px-2" icon="fa-solid fa-plus" size="1x"></font-awesome-icon>
                </label>
              </div>
              <div v-if="user.imgUser" class="btn p-0 m-0 remove-input">
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
            <!-- Data Nascimento -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
              <div class="form-control">
                <div class="d-flex">
                  <div class="col-12">
                    <label for="usuario" class="form-label-text">Data de Nascimento:</label>
                    <input type="date" id="birthday" class="input-text" v-model="user.Birthday"
                      @change="validateBirthday()" placeholder="01/01/1970" />
                  </div>
                  <div class="box-error">
                    <span class="textError">{{ error.Birthday }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="d-flex flex-wrap">
            <!-- Document -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
              <div class="form-control">
                <div class="d-flex">
                  <div class="col-12">
                    <label for="usuario" class="form-label-text">Documento:</label>
                    <input type="text" id="Document" class="input-text" v-model="user.Document"
                      @change="validateDocument()" placeholder="01/01/1970" />
                  </div>
                  <div class="box-error">
                    <span class="textError">{{ error.Document }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Telefone -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
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
          </section>
          <section class="d-flex flex-wrap">
            <!-- País -->
            <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
              <div class="d-flex flex-column form-control">
                <div class="d-flex flex-row">
                  <div class="col-3">
                    <label for="pais" class="form-label-text">País:</label>
                  </div>
                  <div class="col-9 form-control d-flex flex-column">
                    <input type="text" v-model="user.Country" class="form-control b-shadow-2" list="countries"
                      id="country" @change="validateCountry()">
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
                    <label for="usuario" class="form-label-text">CEP:</label>
                    <input type="text" id="ZipCode" class="input-text" v-model="user.ZipCode" @change="validateZipCode()"
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
                    <label for="usuario" class="form-label-text">Endereço:</label>
                    <input type="text" id="Endereço" class="input-text" v-model="user.Address" @change="validateAddress()"
                      placeholder="01/01/1970" />
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
                    <label for="usuario" class="form-label-text">Complemento:</label>
                    <input type="text" id="Complemento" class="input-text" v-model="user.ComplementAddress"
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
                  <input :type="showPassword ? 'text' : 'password'" id="password-confirm" class="input-text"
                    v-model="user.ConfirmPassword" placeholder="c0nfirm p@ssw0rd" @change="validateConfirmPassword()" />
                </div>
                <div class="col-2 d-flex justify-center">
                </div>
              </div>
            </div>
            <span class="textError">{{ error.ConfirmPassword }}</span>
          </div>

          <div class="mb-6 mt-4 d-flex justify-content-center">
            <button type="button" class="btn decoration-primary" @click="edit()" :disabled="!canEdit()">
              Salvar alterações
            </button>
          </div>
        </form>
      </section>
    </div>
  </CardBox>
</template>

<script>
import { ref, inject, watch, onMounted, reactive, toRefs } from "vue";
import AccountService from "@/services/AccountService";
import CardBox from "@/views/components/Layout/CardBox.vue";
import auxiliar from "@/global/auxiliar";
import { useRouter } from "vue-router";
import ObjectUtils from "@/Utils/ObjectUtils";

export default {
  components: { CardBox },
  setup() {
    const router = useRouter();
    const addMessageBox = inject("addMessageBox");
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
      imgUser: localStorage.getItem("imgUser") ?? ObjectUtils.getImgBlank(),
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
              addMessageBox(
                "Ok...",
                "Edição efetuada com sucesso.",
                null,
                "success",
                null
              );
            })
            .catch((ex) => {
              addMessageBox(
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
      handleImgUser() {
        if (user?.value?.imgUser === ObjectUtils.getImgBlank()) {
          return require("@/assets/" + user?.value.imgUser);
        }
        return ObjectUtils.getImgFromBytes(user?.value.imgUser);
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
      uploadFile(event) {
        const files = event.target.files;
        if (files.length > 0) {
          const file = files[0];

          const fileReader = new FileReader();
          fileReader.onload = () => {
            user.value.imgUser = fileReader?.result;
          };
          fileReader.readAsDataURL(file);
        } else {
          console.log("Nenhum arquivo selecionado");
        }
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
        user.value.imgUser = data?.imgUser;
      },
      getInfoUser() {
        AccountService.getInfoUser()
          .then((response) => {
            methods.responseData(response.result);
          })
          .catch((ex) => {
          });
      }
    });

    onMounted(() => {
      methods.getInfoUser();
    });

    watch(user.value, (newV, oldV) => {
      methods.formatInput();
      methods.canEdit();
    });

    return {
      user,
      error,
      router,
      canEdit,
      showPassword,
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