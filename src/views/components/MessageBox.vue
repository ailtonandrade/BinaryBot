<template>
  <div v-for="(m, index) in listMessageBox" :key="index">
    <div class="container modal-box-content p-1" :class="m.modalBoxClass">
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
        <div class="col-12">
          <a
            href="#"
            @click.prevent="funcEmit(m.funcEmit)"
            class="modal-box-btn btn-close"
            >{{ m.btnText }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, toRefs, reactive, onMounted, defineComponent } from "vue";
import "../../styles/commom.css";

export default defineComponent({
  props: ["listMessageBox"],
  emits: ["reconfirmEmail", "closeMessageBox"],
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
onMounted(() => {
  
});
</script>
<style scoped>
html body {
  background-color: transparent !important;
}
.modal-box-content {
  position: relative;
  top: 50px;
  width:80%;
  animation: opacityShow 0.6s ease;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  flex-direction: row;
  align-items: center;
  z-index: 20;
}
.modal-box-content:hover {
  transform: translateX(2px);
  transition: 0.3s ease;
}
.modal-box-title {
  font-weight: 600;
}
.modal-box-message {
  font-weight: 200;
}
.modal-box-btn {
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
  height: 30px;
  width: 30px;
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