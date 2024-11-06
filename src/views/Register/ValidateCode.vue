<template>
  <div class="row">
    <div class="container-fluid">
      <div class="d-flex card-header">
        <div class="col-12 d-flex justify-content-start">
          <router-link to="/">
            <a>Inicio</a>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="col-12">
              <h1>{{ title }}</h1>
            </div>
            <div class="card-body">
              <form>
                <div class="mb-5">
                  <h4 class="form-label">
                    Digite o código que acabou de receber por email
                  </h4>
                  <span
                    >O código de validação tem uma expiração de uma hora, a
                    partir do momento em que recebeu este email. caso necessite
                    podemos
                    <a href="#" @click="reSendCode()">enviar um novo código.</a>
                  </span>
                </div>
                <div class="mb-6 d-flex flex-row justify-content-center">
                  <input
                    type="text"
                    class="form-control card-digit"
                    id="digit-1"
                    v-model="acc.CodeI"
                    @click="
                      () => {
                        acc.CodeI = '';
                      }
                    "
                    @keyup="validateCode(1)"
                  />
                  <input
                    type="text"
                    class="form-control card-digit"
                    id="digit-2"
                    v-model="acc.CodeII"
                    @click="
                      () => {
                        acc.CodeII = '';
                      }
                    "
                    @keyup="validateCode(2)"
                  />
                  <input
                    type="text"
                    class="form-control card-digit"
                    id="digit-3"
                    v-model="acc.CodeIII"
                    @click="
                      () => {
                        acc.CodeIII = '';
                      }
                    "
                    @keyup="validateCode(3)"
                  />
                  <input
                    type="text"
                    class="form-control card-digit"
                    id="digit-4"
                    v-model="acc.CodeIV"
                    @click="
                      () => {
                        acc.CodeIV = '';
                      }
                    "
                    @keyup="validateCode(4)"
                  />
                  <input
                    type="text"
                    class="form-control card-digit"
                    id="digit-5"
                    v-model="acc.CodeV"
                    @click="
                      () => {
                        acc.CodeV = '';
                      }
                    "
                    @keyup="validateCode(5)"
                  />
                </div>
                <div class="mb-6 d-flex flex-row justify-content-center">
                  <div class="box-error">
                    <span class="textError">{{ error.Code }}</span>
                  </div>
                </div>
                <div class="mb-6 mt-4 d-flex justify-content-center">
                  <button
                    id="send-validation"
                    type="button"
                    class="btn btn-primary"
                    @click="validate()"
                    :disabled="!canValidate"
                  >
                    Validar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, inject, ref, watch, reactive, toRefs } from "vue";
import AuthService from "../../services/AuthService";
import auxiliar from "../../global/auxiliar";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("Validar Registro");
    const description = ref("Digite o código para continuar.");
    const router = useRouter();
    const canValidate = ref(false);
    const addMessageBox = inject("addMessageBox");
    const acc = ref({
      CodeI: "",
      CodeII: "",
      CodeIII: "",
      CodeIV: "",
      CodeV: "",
      perfil: "",
    });
    const error = ref({
      Code: "",
    });

    const methods = reactive({
      validate() {
        error.value.Code = "";

        if (methods.canValidate()) {
          let obj = methods.buildValidateObj();
          AuthService.setValidate(obj)
            .then(() => {
              addMessageBox(
                "Ok...",
                "Validação realizada com sucesso.",
                null,
                "success",
                null
              );
              router.push("/");
            })
            .catch((response) => {
              if (response?.response?.data?.message) {
                document.getElementById("digit-1")?.focus();
                error.value.Code = response.response.data.message;
                //methods.getValidate();
              }
            })
            .finally(() => {
              methods.clearDigit();
            });
        }
      },
      buildValidateObj() {
        const validateObj = {
          code:
            acc.value.CodeI +
            acc.value.CodeII +
            acc.value.CodeIII +
            acc.value.CodeIV +
            acc.value.CodeV,
          urlMatch: new URLSearchParams(window.location.search).get("hf"),
        };
        return validateObj;
      },
      clearErrors() {
        error.value.Code = "";
      },
      clearDigit() {
        acc.value.CodeI = "";
        acc.value.CodeII = "";
        acc.value.CodeIII = "";
        acc.value.CodeIV = "";
        acc.value.CodeV = "";
        canValidate.value = false;
      },
      validateCode(index) {
        switch (index) {
          case 1: {
            if (acc.value.CodeI.length > 1) {
              acc.value.CodeI = acc.value.CodeI.substring(0, 1);
            } else if (acc.value.CodeI.length === 1) {
              acc.value.CodeI = acc.value.CodeI.toUpperCase();
              document.getElementById("digit-" + ++index)?.focus();
            }
            break;
          }
          case 2: {
            if (acc.value.CodeII.length > 1) {
              acc.value.CodeII = acc.value.CodeII.substring(0, 1);
            } else if (acc.value.CodeII.length === 1) {
              acc.value.CodeII = acc.value.CodeII.toUpperCase();
              document.getElementById("digit-" + ++index)?.focus();
            }
            break;
          }
          case 3: {
            if (acc.value.CodeIII.length > 1) {
              acc.value.CodeIII = acc.value.CodeIII.substring(0, 1);
            } else if (acc.value.CodeIII.length === 1) {
              acc.value.CodeIII = acc.value.CodeIII.toUpperCase();
              document.getElementById("digit-" + ++index)?.focus();
            }
            break;
          }
          case 4: {
            if (acc.value.CodeIV.length > 1) {
              acc.value.CodeIV = acc.value.CodeIV.substring(0, 1);
            } else if (acc.value.CodeIV.length === 1) {
              acc.value.CodeIV = acc.value.CodeIV.toUpperCase();
              document.getElementById("digit-" + ++index)?.focus();
            }
            break;
          }
          case 5: {
            if (acc.value.CodeV.length > 1) {
              acc.value.CodeV = acc.value.CodeV.substring(0, 1);
            } else if (acc.value.CodeV.length === 1) {
              acc.value.CodeV = acc.value.CodeV.toUpperCase();
              document.getElementById("send-validation")?.focus();
            }
            break;
          }
        }
      },
      canValidate() {
        if (
          error.value.Code.trim() == "" &&
          acc.value.CodeI.length === 1 &&
          acc.value.CodeII.length === 1 &&
          acc.value.CodeIII.length === 1 &&
          acc.value.CodeIV.length === 1 &&
          acc.value.CodeV.length === 1
        ) {
          canValidate.value = true;
          return canValidate.value;
        }
        canValidate.value = false;
        return canValidate.value;
      },
      formatInput() {
        if (acc.value.CodeI.length > 1) {
          acc.value.CodeI = acc.value.CodeI.substr(0, 1);
        }
        if (acc.value.CodeII.length > 1) {
          acc.value.CodeII = acc.value.CodeII.substr(0, 1);
        }
        if (acc.value.CodeIII.length > 1) {
          acc.value.CodeIII = acc.value.CodeIII.substr(0, 1);
        }
        if (acc.value.CodeIV.length > 1) {
          acc.value.CodeIV = acc.value.CodeIV.substr(0, 1);
        }
        if (acc.value.CodeV.length > 1) {
          acc.value.CodeV = acc.value.CodeV.substr(0, 1);
        }
      },
      responseData(data) {
        if (data) {
          localStorage.setItem("token", data.hash);
        }
      },
      getValidate() {
        AuthService.getValidate()
          .then((response) => {
            methods.responseData(response.data);
          })
          .catch((ex) => {
            router.push("/");
          });
      },
      reSendCode() {
        AuthService.reSendCode()
          .then((response) => {
            addMessageBox("Ok...", response.data, null, "success", null);
            router.push("/");
          })
          .catch((ex) => {
            ("Ok...", ex.response, null, "warning", null);
            error.value.Code = ex.response;
          });
      },
    });

    onMounted(() => {
      document.getElementById("digit-1")?.focus();
    });
    watch(acc.value, (newV, oldV) => {
      methods.canValidate();
      methods.formatInput();
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
  font-size: 9pt;
  text-align: center;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.card-digit {
  height: 50px;
  width: 50px;
  text-align: center;
  font-weight: bold;
  font-size: large;
}

.box-error {
  height: 18px;
}
</style>