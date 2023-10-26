<template>
  <div v-if="show" :id="'modal-custom-' + reference" @click="closeModal()" class="modal-box-back" />
  <div class="body justify-center modal-box-content">
    <div class="col-12">
      <div class="flex-row">
        <div class="d-flex align-center justify-start col-10">
          <font-awesome-icon v-if="icon != null" class="icon-modal" :icon="icon" size="1x" />
          <h1 v-if="title != null" class="title">{{ title }}</h1>
        </div>
        <div :class="icon != null ? 'col-2' : 'col-12'" class="flex align-center flex-center">
          <button @click="closeModal()" class="btn-close">X</button>
        </div>
      </div>
      <hr />
      <div class="flex-row">
        <div class="flex align-center col-12 justify-center">
          <form>
            <div class="form-group form-control">
              <label for="" class="label-form-control">Nome</label>
              <select type="text" class="form-control" id="IqOption" @change="">
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
      </div>
      <hr />
      <div v-if="action" class="flex-row">
        <div class="col-12 flex flex-end">
          <button class="btn-action-confirm" @click="toAction()">
            {{ action }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, inject } from "vue";
export default defineComponent({
  emits: ["closeModal"],
  props: {
    show: Boolean = false,
    reference: String,
    title: String,
    icon: String,
    message: String,
    action: String,
    description: String,
  },
  setup(props, { emit }) {
    const closeModalCustom = inject("closeModalCustom");

    const methods = reactive({
      closeModal() {
        closeModalCustom();
      },
      toAction() {
        console.log("ação modal custom = " + props.action);
      },
    });
    return {
      closeModalCustom,
      ...toRefs(methods),
    };
  },
  name: "ModalCustom",
});
</script>
<style scoped>
.body {
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 365px;
  background-color: var(--switch-mode-secondary);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: 0.6s ease;
}

.modal-box-back {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.5;
}

.icon-modal {
  margin-right: 10px;
}

.title {
  padding-top: 15px;
  font-size: large;
}

.message {
  font-size: large;
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
  background-color: var(--switch-mode-secondary);
  color: var(--switch-elements-mode-secondary);
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  outline: none;
}

.btn-close:hover {
  opacity: 0.9;
}

.btn-close:active {
  opacity: 0.2;
  background-color: var(--switch-mode-secondary);
  color: var(--switch-elements-mode-secondary);
}

/* btn action */
.btn-action-cancel {
  height: 25px;
  background-color: var(--switch-mode-secondary);
  color: var(--switch-elements-mode-secondary);
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  outline: none;
}

.btn-action-cancel:hover {
  opacity: 0.9;
}

.btn-action-cancel:active {
  opacity: 0.2;
  background-color: var(--switch-mode-secondary);
  color: var(--switch-elements-mode-secondary);
}

.btn-action-confirm {
  height: 25px;
  background-color: var(--switch-mode-secondary);
  color: var(--switch-elements-mode-secondary);
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  outline: none;
}

.btn-action-confirm:hover {
  opacity: 0.9;
}

.btn-action-confirm:active {
  opacity: 0.2;
  background-color: var(--switch-mode-secondary);
  color: var(--switch-elements-mode-secondary);
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


