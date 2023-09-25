<template>
  <div>
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
import { Perfils } from "../../../enums/perfils";
import AdminBoard from "./adminBoard/adminBoard.vue";
import AuthService from "../../../services/AuthService";

export default defineComponent({
  components: {
    AdminBoard,
  },
  setup(props) {
    const title = ref("Painel");
    const description = ref("Informações de conta.");
    const router = useRouter();
    const userData = ref();
    //modal box
    const _showModalBox = inject("showModalBox");
    //message box
    const _listMessageBox = inject("listMessageBox");
    const _addMessageBox = inject("addMessageBox");
    const _actionMessageBox = inject("actionMessageBox");
    const handleActionMessageBox = computed(() => {
      runActionMessageBox(_actionMessageBox);
    });

    const methods = reactive({
      resendEmailConfirm() {},
      runActionMessageBox(action) {
        switch (action) {
          case "reconfirmEmail": {
            console.log("reconfirmEmail");
            break;
          }
        }
      },
    });

    onMounted(() => {
      if (localStorage.getItem("confirmedEmail") === "false") {
        _addMessageBox(
          "Atenção",
          "Confirmação de email não realizada",
          "Reenviar email de confirmação",
          "warning",
          "reconfirmEmail"
        );
        _showModalBox(
          "Atenção",
          "Confirmação de email não realizada.",
          "resendConfirmEmail",
          "Reenviar confirmação"
        );
      }
    });

    return {
      title,
      description,
      handleActionMessageBox,
      ...toRefs(methods),
      router,
      userData,
      Perfils,
    };
  },
});
</script>
  