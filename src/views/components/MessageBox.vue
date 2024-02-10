<template>
  <div v-for="(m, index) in listMessageBox" :key="index">
    <div class="col-6 modal-box-content p-1" :class="m.modalBoxClass">
      <div class="flex-row justify-center col-12">
        <div class="col-9">
          <span class="modal-box-title">{{ m.title }} - </span>
          <span class="modal-box-message">{{ m.message }}</span>
        </div>
        <div class="align-center modal-box-close col-3">
          <button @click="closeMessageBox(index)" class="btn-close">X</button>
        </div>
      </div>
      <div class="col-12">
        <a href="#" @click.prevent="funcEmit(m.funcEmit)" class="modal-box-btn">{{ m.btnText }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, toRefs, reactive, onMounted, defineComponent } from "vue";
import "@/styles/commom.css";

export default defineComponent({
  props: ["listMessageBox"],
  emits: ["reconfirmEmail", "closeMessageBox", "action"],
  setup(props, { emit }) {
    const methods = reactive({
      funcEmit(func) {
        emit("action", func);
      },
      closeMessageBox(index) {
        props.listMessageBox.splice(index, 1);
      },
    });
    return {
      ...toRefs(methods),
    };
  },
});

</script>
<style scoped>
html body {
  background-color: transparent !important;
}

.modal-box-content {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: opacityShow 0.6s ease;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  flex-direction: row;
  align-items: center;
  transition: 0.3s;
  z-index: 20;
}

.modal-box-content:hover {
  transform: translateX(-49%);
  transition: 0.3s;
}

.modal-box-title {
  font-weight: 600;
}

.modal-box-message {
  font-weight: 200;
}

.modal-box-btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 15px;
  min-width: 55px;
  border-radius: 5px;
  color: black;
}

.modal-box-btn:hover {
  text-decoration: underline;
}

.modal-box-close {
  display: flex;
  justify-content: flex-end;
}

.btn-close {
  font-size: 7pt;
  height: 20px;
  width: 20px;
  transition: 0.5s;
  outline: none;
}

.btn-close:hover {
  opacity: 0.9;
}

.btn-close:active {
  opacity: 0.2;
}

.modal-box-close button {
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

@keyframes opacityShow {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>