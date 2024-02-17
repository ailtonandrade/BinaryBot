<template>
  <div class="d-flex justify-center align-center">
    <h1>404 - Not Found</h1>
  </div>
</template>
  
<script>
import {
  ref,
  computed,
  onMounted,
  toRefs,
  reactive,
  inject,
  defineComponent,
} from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
  },
  setup(props) {
    const router = useRouter();
    //modal box
    const isLoggedIn = inject("isLoggedIn");
    const handleModalBox = inject("handleModalBox");
    const clearModalBox = inject("clearModalBox");


    const methods = reactive({

    });

    onMounted(() => {
      handleModalBox(
        "Oops...",
        "Não encontramos o que procura.",
        "Descricao",
        "fa-solid fa-file-lines",
        null
      );
      setTimeout(() => {
        clearModalBox();
        if(isLoggedIn){
          router.goTo("dashboard");
        }else{
          router.goTo("home");
        }
        }, 2000);
    });

    return {
      ...toRefs(methods),
      router,
    };
  },
});
</script>
  
<style scoped>

html body {
  background-color: var(--switch-mode-primary);
}
</style>