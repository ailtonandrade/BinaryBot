<template>
  <div>
    <div>
      <Menu></Menu>
      <MessageBox
        :listMessages="messagesBox"
        @resendEmailConfirm="resendEmailConfirm()"
      >
      </MessageBox>
    </div>
    <div class="container">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
    <div class="card">
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
  </div>
</template>
  
<script>
import { ref, onMounted, toRefs, reactive, inject, defineComponent } from "vue";
import { useRouter } from "vue-router";
import Menu from "../../components/menu.vue";
import { Perfils } from "../../../enums/perfils";
import AdminBoard from "./adminBoard/adminBoard.vue";
import MessageBox from "../../components/MessageBox.vue";
import AuthService from "../../../services/AuthService";

export default defineComponent({
  components: {
    Menu,
    AdminBoard,
    MessageBox,
  },
  setup() {
    
    const title = ref("Painel");
    const description = ref("Informações de conta.");
    const router = useRouter();
    const userData = ref();
    const messagesBox = ref([]);
    const accountData = inject("test");
    console.log(accountData);
    
    const methods = reactive({
      resendEmailConfirm() {},
    });
    onMounted(() => {
      console.log(accountData);
      // if (accountData.value.confirmedEmail == false) {
      //   messagesBox.value.push({
      //     title: "Atenção",
      //     message: "Confirmação de email não realizada",
      //     btnText: "Reenviar email de confirmação",
      //     modalBoxClass: "warning",
      //     func: "reconfirmEmail",
      //   });
      // }
    });

    return {
      title,
      description,
      messagesBox,
      accountData,
      ...toRefs(methods),
      router,
      userData,
      Perfils,
    };
  },
});
</script>
  