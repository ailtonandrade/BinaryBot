<template>
  <div id="modal-message-box" class="card modal-message-box" :style="modalStyle">
    <p>sadsdasdsadsdasdsadsdasdsadsdasdsadsdasdsad</p>
  </div>
</template>
<script lang="ts">
import { ref, reactive, provide, toRefs } from "vue";

export default {
  setup() {
    const message = ref("");
    const buttonTitle = ref("");
    const funcEmit = ref("");
    const isHide = ref(true);
    const modalStyle = ref({ display: "none" });
    const methods = reactive({
      messageBox(_message: any, _buttonTitle: any, _funcEmit: any) {
        message.value = _message;
        buttonTitle.value = _buttonTitle;
        funcEmit.value = _funcEmit;

        methods.show();
      },
      show() {
        modalStyle.value.display = "none";
      },
    });
    provide("messageBox", methods.messageBox);

    return {
      message,
      buttonTitle,
      funcEmit,
      isHide,
      modalStyle,
      ...toRefs(methods)
    }
  }
}



</script>
<style scoped>
nav {
  width: 100vw;
}

button:hover {
  border-color: white;
}

.nav-btn-row {
  display: flex;
  justify-content: flex-end;
}

.btn-nav {
  color: white;
  text-decoration: none;
}

.btn-nav:hover {
  opacity: 0.8;
}

.modal-message-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>