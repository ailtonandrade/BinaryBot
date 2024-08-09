<template>
  <CardBox :title="'Meus dados'" :description="'Editando Páginas'"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: 'Editar Páginas', link: 'edit-pages' }]">
    
  </CardBox>
</template>

<script>
import { ref, inject, watch, onMounted, reactive, toRefs, computed } from "vue";
import AccountService from "@/services/AccountService";
import CardBox from "@/views/components/Layout/CardBox.vue";
import auxiliar from "@/global/auxiliar";
import { useRouter, useRoute } from "vue-router";
import ObjectUtils from "@/Utils/ObjectUtils";

export default {
  name: "EditPages",
  components: { CardBox },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const addMessageBox = inject("addMessageBox");
    

    const methods = reactive({
      
    });

    onMounted(() => {
    });

    return {
      route,
      router,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped>

</style>