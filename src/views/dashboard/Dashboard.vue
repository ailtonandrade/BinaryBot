<template>
    <div>
        <Menu></Menu>
    </div>
    <div class="container">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
    <div class="card">
      <div v-if="1==1"></div>
      <div v-if="userData == Perfils.ADMIN">
        <admin-board></admin-board>
      </div>
      <div v-if="userData == Perfils.GUEST">
        <span>visitante</span>
      </div>
      <div v-if="userData == Perfils.SIGNATED">
        <span>assinante</span>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from "vue";
  import { Perfils } from '../../enums/perfils';
  import { useRouter } from "vue-router";
  import Menu from "../components/menu.vue";
import AdminBoard from './adminBoard/adminBoard.vue';
import AuthService from "../../services/AuthService";
import { AxiosResponse } from "axios";

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
      const userData = ref();
      const methods = {
        responseData(data:AxiosResponse){

        }
      };

      onMounted(() => {
        AuthService.getPerfil()
            .then((response) => {
              methods.responseData(response);
            })
            .catch((error) => {
              console.log(error);
              alert(error.response.data.message);
            })
    });

      return {
        title,
        description,
        methods,
        router,
        userData,
        Perfils
      };
    },
  };
  </script>
  