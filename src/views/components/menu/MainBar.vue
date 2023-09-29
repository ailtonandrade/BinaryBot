<template>
  <div class="flex-row justify-end p-3 main-bar">
    <button class="p-1" @click="logout()">
      <font-awesome-icon icon="fa-solid fa-sign-out" size="1x" />
    </button>
    <a href="#">Sair</a>
  </div>
</template>
<script>
import { inject, toRefs, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const showMenuBar = ref(false);
    const clearModalBox = inject("clearModalBox");
    const clearMessageBox = inject("clearMessageBox");
    const methods = reactive({
      logout() {
        localStorage.clear();
        clearModalBox();
        clearMessageBox();
        router.goTo("home");
      },
    });

    return {
      router,
      showMenuBar,
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
@import "../../../styles/commom.css";

.main-bar{

}
</style>