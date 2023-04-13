<template>

  </template>
  
  <script>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  export default {
    setup() {
      const title = ref("Binance");
      const description = ref(
        "Vincular minha conta Binance para operar"
      );
      const methods = {

        
      };
  
      return {
        title,
        description,
        methods,
      };
    },
  };
  </script>
  