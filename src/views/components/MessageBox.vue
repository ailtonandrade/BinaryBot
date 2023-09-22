<template>
  <div v-for="(m, index) in listMessages" :key="index">
    <div class="container modal-box-content p-1" :class="m.modalBoxClass">
      <div class="flex-row justify-center col-12">
        <div class="col-10">
          <span class="modal-box-title">{{ m.title }} - </span>
          <span class="modal-box-message">{{ m.message }}</span>
        </div>
        <div class="modal-box-close col-2">
          <button class="btn-close">X</button>
        </div>
      </div>
      <div class="col-12">
        <div class="col-12">
          <a href="#" @click.prevent="funcEmit('resendEmailConfirm')" class="modal-box-btn btn-close">{{ m.btnText }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent } from "vue";
import "../../styles/commom.css";

export default defineComponent({
  props: {
    listMessages: Array,
  },
  emits: ["resendEmailConfirm"],
  setup(props, { emit }) {
    const methods = reactive({
      funcEmit(func:any){
        emit(func);
      }
    })
    return {
      ...toRefs(methods)
    };
  },
});
</script>
<style scoped>
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
.btn-close{
  transition: 0.5s;
  outline: none;
}
.btn-close:hover{
  opacity: 0.9;
}
.btn-close:active{
  opacity: 0.2;
}
.modal-box-close button {
  height: 30px;
  width: 30px;
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.modal-box-content {
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  flex-direction: row;
  align-items: center;
}
</style>