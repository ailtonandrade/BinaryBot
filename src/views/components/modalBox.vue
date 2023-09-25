<template>
  <div class="body justify-center modal-box-content">
    <div class="col-12">
      <div class="flex col-12 align-top flex-space-between">
        <h1 class="title">{{ title }}</h1>
        <button @click="closeModal()" class="btn-close">X</button>
      </div>
      <hr />
      <div class="flex-row">
        <div class="flex col-12 justify-center">
          <p class="message">
            {{ message }}
          </p>
        </div>
      </div>
      <hr />
      <div class="flex-row">
        <div class="col-12 flex flex-end">
          <button class="btn-action-confirm" @click="toAction()">
            {{ description }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  emits: ["closeModal"],
  props: {
    title: String,
    message: String,
    action: String,
    description: String,
  },
  setup(props, { emit }) {
    const methods = reactive({
      closeModal() {
        emit("closeModal");
      },
      toAction() {
        console.log("ação modal box = " + props.action);
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
  background-color: rgb(240, 240, 240);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.title {
  font-size: x-large;
}
.message {
  font-size: large;
}
.modal-box-content {
  min-height: 35vh;
  width: 80%;
  min-width: 150px;
  max-width: 450px;
  padding-top: 20px;
}
/* btn close */
.btn-close {
  height: 25px;
  width: 25px;
  background-color: rgb(46, 46, 46);
  color: wheat;
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
  background-color: wheat;
  color: rgb(46, 46, 46);
}
/* btn action */
.btn-action-cancel {
  height: 25px;
  background-color: rgb(46, 46, 46);
  color: wheat;
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
  background-color: wheat;
  color: rgb(46, 46, 46);
}
.btn-action-confirm {
  height: 25px;
  background-color: rgb(231, 231, 231);
  color: rgb(46, 46, 46);
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
  background-color: rgb(46, 46, 46);
  color: rgb(231, 231, 231);
}
.btn-action {
  padding-top: 20px;
}
</style>


