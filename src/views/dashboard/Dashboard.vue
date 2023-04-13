<template>
    <div>
        <Menu></Menu>
    </div>
    <div class="container">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
    <div class="card">
      <div v-if="userRole == Roles.ADMIN">
        <admin-board></admin-board>
      </div>
      <div v-if="userRole == Roles.GUEST">
        <span>visitante</span>
      </div>
      <div v-if="userRole == Roles.SIGNATED">
        <span>assinante</span>
      </div>
      <div v-if="userRole == Roles.NEAR_EXPIRATION">
        <span>vencimento próximo</span>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from "vue";
  import { Roles } from '../../enums/roles';
  import { useRouter } from "vue-router";
  import Menu from "../components/menu.vue";
import AdminBoard from './adminBoard/adminBoard.vue';

  export default {
    components: {
        Menu,
        AdminBoard
    },
    setup() {
      const title = ref("Painel");
      const description = ref(
        "Informações de conta."
      );
      const router = useRouter();
      const userRole = ref();
      const methods = {
        
      };

      onMounted(() => {
        userRole.value = localStorage.getItem("role");
    });

      return {
        title,
        description,
        methods,
        router,
        userRole,
        Roles
      };
    },
  };
  </script>
  