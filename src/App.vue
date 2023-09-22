<template>
  <main>
    <router-view> </router-view>
    <MessageBox
      v-if="_listMessageBox?.length > 0"
      :listMessages="_listMessageBox"
      @action="actionMessageBox(event)"
    />
    <ModalBox
      v-if="_showModalBox"
      @closeModal="closeModalBox()"
      class="modal-box"
    />
  </main>
</template>
<script>
import { inject, provide, reactive, ref, toRefs } from "vue";
import ModalBox from "./views/components/modalBox.vue";
import MessageBox from "./views/components/MessageBox.vue";

export default {
  name: "App",
  components: { ModalBox, MessageBox },
  setup() {
    const _showModalBox = ref(false);
    
    const _listMessageBox = ref([]);
    const _actionMessageBox = ref();

    const methods = reactive({
      closeModalBox() {
        _showModalBox.value = false;
      },
      showModalBox() {
        _showModalBox.value = true;
      },
      actionMessageBox(event) {
        _actionMessageBox.value = event;
      },
    });

    provide("actionMessageBox", _actionMessageBox);
    provide("listMessageBox", _listMessageBox);
    provide("showModalBox", methods.showModalBox);
    return {
      _showModalBox,
      _listMessageBox,
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
@import "./styles/commom.css";
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.modal-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
