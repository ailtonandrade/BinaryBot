<template>
  <div @click="closeModal()" class="modal-box-back" />
  <div class="body justify-center modal-box-content">
    <div class="col-12 px-0">
      <div class="header-modal-box flex-row col-12 justify-content-between align-center">
        <div class="d-flex justify-content-center align-center">
          <font-awesome-icon v-if="icon" class="icon-modal" :icon="icon" size="2x" />
        </div>
        <div class="d-flex justify-content-start align-center">
          <h1 v-if="title != null" class="title">{{ title }}</h1>
        </div>
        <div class="col-1">
          <button class="btn-close" @click="closeModal()">X</button>
        </div>
      </div>
      <hr />
      <div class="col-12">
        <div class="d-flex flex-column align-center">
          <p class="message">
            {{ message }}
          </p>
          <b class="message">{{ description }}</b>
        </div>
      </div>
      <hr />
      <div v-if="action">
        <div class="col-12 d-flex justify-content-center">
          <button class="btn-action-confirm" @click="action">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
export default defineComponent({
  emits: ["closeModal"],
  props: {
    action: {
      type: Function,
      required: false,
    },
    title: String,
    icon: String,
    message: String,
    description: String
  },
  setup(props, { emit }) {
    const methods = reactive({
      closeModal() {
        emit("closeModal");
      },
      toAction() {
        this.action();
      },
    });
    return {
      ...toRefs(methods),
    };
  },
  name: "ModalBox",
});
</script>
<style scoped>
.body {
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 365px;
  background-color: var(--switch-mode-secondary);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: 0.6s ease;
  padding: 10px 5px;
}

.header-modal-box {
  border-radius: 6px;
  background-color: var(--switch-mode-tertiary);
}

.modal-box-back {
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.7;
}

.icon-modal {
  color: var(--switch-elements-mode-secondary);
}

.title {
  padding-top: 15px;
  font-size: x-large;
  color: var(--switch-elements-mode-secondary);
}

.message {
  font-size: large;
  color: var(--switch-elements-mode-secondary);

}

.modal-box-content {
  animation: slideDown 0.3s ease;
  width: 80%;
  min-width: 150px;
  max-width: 450px;
  padding-top: 5px;
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
  font-size: small;
}

.btn-close:hover {
  color: var(--switch-mode-secondary);
  background-color: var(--switch-elements-mode-tertiary);
}

.btn-close:active {
  opacity: 0.8;
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

.btn-action-confirm {
  height: 25px;
  background-color: var(--switch-mode-tertiary);
  color: var(--switch-elements-mode-tertiary);
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  outline: none;
  cursor: pointer;
  margin: 15px 10px;
}

.btn-action-confirm:hover {
  color: var(--switch-mode-secondary);
  background-color: var(--switch-elements-mode-tertiary);
}

.btn-action-confirm:active {
  opacity: 0.8;
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
