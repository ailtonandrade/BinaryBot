<template>
  <div>
    <Menu></Menu>
    <div v-for="">
      <MessageBox></MessageBox>
    </div>
  </div>
  <div class="container">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
  <div class="card">
    <div v-if="1 == 1"></div>
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
import { ref, onMounted, toRefs, reactive, inject } from "vue";
import { useRouter } from "vue-router";
import Menu from "../components/menu.vue";
import { Perfils } from '../../enums/perfils';
import AdminBoard from './adminBoard/adminBoard.vue';
import MessageBox from '../components/MessageBox.vue';
import AuthService from "../../services/AuthService";


export default {
  components: {
    Menu,
    AdminBoard,
    MessageBox,
  },
  setup() {
    const title = ref("Painel");
    const description = ref(
      "Informações de conta."
    );
    const router = useRouter();
    const userData = ref();
    const showMessageBox = ref(false);
    const messagesBox = ref([])
    const methods = reactive({
      responseData(data: any) {
        if (data) {
          if (data.confirmedEmail == false) {
            showMessageBox.value = true;
            messagesBox.value.push({"Atenção","Confirmação de email não realizada","Reenviar email de confirmação","reconfirmEmail"})
          }
        }
      }
    });

    onMounted(() => {
      AuthService.getPerfil()
        .then((response) => {
          methods.responseData(response.data);
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        })
    });

    return {
      title,
      description,
      showMessageBox,
      messagesBox,
      ...toRefs(methods),
      router,
      userData,
      Perfils
    };
  },
};
</script>
  