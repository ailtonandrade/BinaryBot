<template>
  <main>
    <MessageBox
      :isModalVisible="showModalMessageBox"
      :message="messageModalMessageBox"
      :buttonTitle="buttonTitleModalMessageBox"
      :funcEmit="funcEmitModalMessageBox"
    />
    <router-view />
  </main>
</template>
<script lang="ts">
import { ref, onMounted, reactive, toRefs, provide } from "vue";
import MessageBox from "./views/components/MessageBox.vue";
export default {
  components: {
    MessageBox,
  },
  setup() {
    const showModalMessageBox = ref(false);
    const messageModalMessageBox = ref("");
    const buttonTitleModalMessageBox = ref("");
    const funcEmitModalMessageBox = ref("");
    const methods = reactive({
      showMessageBox(
        _message: string,
        _buttonTitle: string,
        _funcEmit: string
      ) {
        showModalMessageBox.value = true;
        messageModalMessageBox.value = _message;
        buttonTitleModalMessageBox.value = _buttonTitle;
        funcEmitModalMessageBox.value = _funcEmit;
      },
    });

    //provide("showMessageBox", methods.showMessageBox);
    
    return {
      showModalMessageBox,
      messageModalMessageBox,
      buttonTitleModalMessageBox,
      funcEmitModalMessageBox,
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");

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
</style>
