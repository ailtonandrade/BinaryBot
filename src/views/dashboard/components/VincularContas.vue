<template></template>
  
<script>
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("Binance");
    const description = ref(
      "Vincular minha conta Binance para operar"
    );
    const methods = reactive({


    });

    return {
      title,
      description,
      ...toRefs(methods),
    };
  },
};
</script>
  