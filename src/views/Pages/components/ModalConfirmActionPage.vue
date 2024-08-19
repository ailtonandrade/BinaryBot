<template>
  <div :id="'modal-custom-' + reference" class="body">
    <div class="col-12 modal-box">
      <div class="flex-row">
        <div class="d-flex align-center justify-start col-10">
          <font-awesome-icon v-if="configModal.icon != null" class="icon-modal" :icon="configModal.icon" size="1x" />
          <h1 v-if="configModal.title != null" class="title">{{ configModal.title }}</h1>
        </div>
        <div :class="configModal.icon != null ? 'col-2' : 'col-12'" class="flex align-center flex-center">
          <button @click="closeModal()" class="btn-close">x</button>
        </div>
      </div>
      <hr />
      <!-- MODAL CONTENT HERE -->
      <!-- MODAL CONTENT HERE -->
      <!-- MODAL CONTENT HERE -->
      <div class="modal-box-content">
        <div class="col-12">
          <div v-if="configModal?.action?.includes('add')">
            <div class="row">
              <div class="col-lg-12 col-md-6 col-12 py-2">
                <div class="flex-column justify-center icon-area-menu  b-shadow-1">
                  <div class="d-flex justify-center py-1">
                    <font-awesome-icon class="" :icon="data?.icon ?? 'fa-regular fa-circle'"
                      size="2x"></font-awesome-icon>
                  </div>
                  <small class="">Icon </small><br />
                  <small class="sub-text-name">Atribua um icone para representar esta nova rota.</small>
                  <input class="form-control b-radius-top-0" @blur="setIcon($event)" v-model="data.icon" />
                </div>
              </div>
              <div class="col-lg-12 col-md-6 col-12">
                <div class="flex-column align-center justify-center icon-area-menu  b-shadow-1">
                  <small class="">Name </small><br />
                  <small class="sub-text-name">Define o nome da rota que será concatenada ao path.</small>
                  <input class="form-control small b-radius-top-0" @keyup="toLower($event)" v-model="data.name" />
                  <small class="">Display Name </small><br />
                  <small class="sub-text-name">Adiciona um apelido ou uma descrição breve da rota.</small>
                  <input class="form-control small b-radius-top-0" v-model="data.displayName" />
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <span class="modal-text-message">{{ configModal?.message }}</span>
          </div>
        </div>
      </div>
      <!-- MODAL CONTENT HERE -->
      <!-- MODAL CONTENT HERE -->
      <!-- MODAL CONTENT HERE -->
      <hr />
      <div v-if="configModal.action" class="flex-row">
        <div class="col-12 flex justify-center">
          <button class="btn-action-confirm" @click="toAction()">
            Confirmar e Salvar alterações
          </button>
        </div>
      </div>
    </div>
    <div @click="closeModal()" class="modal-box-back"></div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, inject, ref, computed } from "vue";
export default defineComponent({
  emits: ["closeModal", "execute"],
  props: ["reference"],
  name: "ModalConfirmActionPage",
  setup(props, { emit }) {
    const closeModalCustom = inject("closeModalCustom");
    const configModal = inject("configModalCustom");
    const data = ref({
      icon: 'fa-regular fa-circle',
      name: '',
      displayName: ''
    });
    const methods = reactive({
      closeModal() {
        closeModalCustom(configModal.value);
        data.value = {
          icon: 'fa-regular fa-circle',
          name: '',
          displayName: ''
        };
      },
      setIcon(event) {
        if (!event?.target?.value?.includes('fa-')) {
          data.value.icon = 'fa-' + event?.target?.value;
        }
      },
      toLower(event) {
        event.target.value = event.target.value.toLowerCase();
      },
      toAction() {
        let obj = configModal.value;
        obj.data = data.value;
        console.log("execute")
        console.log(obj)
        emit("execute", obj);
        methods.closeModal();
      },
    });
    return {
      data,
      configModal,
      closeModalCustom,
      ...toRefs(methods),
    };
  },
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
  height: 100dvh;
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: var(--switch-mode-elements-tertiary);
  padding-top: 5px;
}

.modal-text-message {
  color: var(--switch-mode-elements-secondary);
}

.sub-text-name {
  opacity: 0.4;
  font-size: 7pt;
  padding: 0;
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
  opacity: 0.7;
}

.btn-close:hover {
  opacity: 1;
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
