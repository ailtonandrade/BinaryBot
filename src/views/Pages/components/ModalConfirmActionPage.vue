<template>
  <div :id="'modal-custom-' + reference" class="body">
    <div class="col-12 modal-box">
      <div class="flex-row">
        <div class="d-flex align-center justify-start col-10">
          <font-awesome-icon v-if="configModalCustom.icon != null" class="icon-modal" :icon="configModalCustom.icon"
            size="1x" />
          <h1 v-if="configModalCustom.title != null" class="title">{{ configModalCustom.title }}</h1>
        </div>
        <div :class="configModalCustom.icon != null ? 'col-2' : 'col-12'" class="flex align-center flex-center">
          <button @click="closeModal()" class="btn-close">x</button>
        </div>
      </div>
      <hr />
      <!-- MODAL CONTENT HERE -->
      <!-- MODAL CONTENT HERE -->
      <!-- MODAL CONTENT HERE -->
      <div class="modal-box-content">
        <div class="flex align-center col-12 justify-center">
          <form>
            <div class="form-group form-control">
              <label for="" class="label-form-control">Nome</label>
              <select class="form-control" id="IqOption" @change="">
                <option selected value="IqOption">IQ Option</option>
                <option value="Metatrader">Metatrader 5</option>
              </select>
            </div>
            <div class="form-group form-control">
              <div class="col-12">
                <label for="userName" class="form-label-text">Usuário da Plataforma:</label>
                <input type="text" id="userName" class="input-text" @change="" placeholder="usuari011011" />
              </div>
            </div>
            <div class="form-group form-control">
              <div class="col-12">
                <label for="password" class="form-label-text">Senha da Plataforma:</label>
                <input type="password" id="password" class="input-text" @change="" placeholder="p@ss011011" />
              </div>
            </div>
            <div class="d-flex justify-center">
              <button type="button"
                class="col-lg-8 col-md-8 col-sm-12 mb-3 btn btn-login decoration-primary b-radius-10 p-1 b-shadow-1"
                @click="">
                Registrar
              </button>
            </div>
          </form>
        </div>
        <!-- MODAL CONTENT HERE -->
        <!-- MODAL CONTENT HERE -->
        <!-- MODAL CONTENT HERE -->
      </div>
      <hr />
      <div v-if="configModalCustom.action" class="flex-row">
        <div class="col-12 flex justify-center">
          <button class="btn-action-confirm" @click="toAction()">
            Confirmar
          </button>
        </div>
      </div>
    </div>
    <div @click="closeModal()" class="modal-box-back"></div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, inject } from "vue";
export default defineComponent({
  emits: ["closeModal"],
  props: ["configModalCustom", "reference"],
  setup(props, { emit }) {
    const closeModalCustom = inject("closeModalCustom");
    const methods = reactive({
      closeModal() {
        closeModalCustom(props.configModalCustom);
      },
      toAction() {
        console.log("ação modal custom = " + props.configModalCustom.action);
        methods.closeModal();
      },
    });
    return {
      closeModalCustom,
      ...toRefs(methods),
    };
  },
  name: "ModalConfirmActionPage",
});
</script>
<style scoped>
.body {
  display: none;
  position: absolute;
  transition: 0.6s ease;
  top: 0;
  left: 0;
  z-index: 4;
}

.modal-box-back {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.5;
  z-index: -3;
}

.icon-modal {
  color: var(--switch-mode-elements-secondary);
  margin-right: 10px;
}

.title {
  padding-top: 15px;
  font-size: large;
}

.message {
  font-size: large;
}

.modal-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  padding: 15px;
  border-radius: 10px;
  background-color: var(--switch-mode-secondary);
}

.modal-box-content {
  animation: slideDown 0.3s ease;
  width: 80%;
  min-width: 150px;
  max-width: 450px;
  padding-top: 5px;
  opacity: 1;
}

/* btn close */
.btn-close {
  cursor: pointer;
  height: 25px;
  width: 25px;
  background-color: var(--switch-mode-tertiary);
  color: var(--switch-mode-elements-secondary);
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  outline: none;
}

.btn-close:hover {
  opacity: 0.9;
}

.btn-close:active {
  opacity: 0.2;
  background-color: var(--switch-mode-secondary);
  color: var(--switch-mode-elements-secondary);
}

/* btn action */
.btn-action-cancel {
  height: 25px;
  background-color: var(--switch-mode-tertiary);
  color: var(--switch-mode-elements-secondary);
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  outline: none;
}

.btn-action-cancel:hover {
  opacity: 0.9;
}

.btn-action-cancel:active {
  opacity: 0.2;
  background-color: var(--switch-mode-secondary);
  color: var(--switch-mode-elements-secondary);
}

.btn-action-confirm {
  height: 35px;
  width: 90%;
  background-color: var(--switch-mode-tertiary);
  color: var(--switch-mode-elements-tertiary);
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  transition: 0.2s;
  outline: none;
  cursor: pointer;
}

.btn-action-confirm:hover {
  color: var(--switch-mode-tertiary);
  background-color: var(--decoration-primary-after);
}

.btn-action-confirm:active {
  opacity: 0.2;
  background-color: var(--switch-mode-secondary);
  color: var(--switch-mode-elements-secondary);
}

.btn-action {
  padding-top: 20px;
}

@keyframes slideDown {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
