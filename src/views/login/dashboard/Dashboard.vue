<template>
  <card-box :title="title" :description="description" :breadcrumb="[{ name: 'Dashboard', link: '' }]">
    <div class="dashboard-content">
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
  </card-box>
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
import CardBox from "../../components/Layout/CardBox.vue";

export default defineComponent({
  components: {
    AdminBoard,
    CardBox
  },
  setup(props) {
    const title = ref("Painel");
    const description = ref("Informações de conta.");
    const router = useRouter();
    const userData = ref();
    //modal box
    const _showModalBox = inject("showModalBox");
    //message box
    const _addMessageBox = inject("addMessageBox");
    const _actionMessageBox = inject("actionMessageBox");
    const handleActionMessageBox = computed(() => {
      runActionMessageBox(_actionMessageBox);
    });

    const methods = reactive({
      resendEmailConfirm() { },
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
      AuthService.getPerfil()
        .then((response) => {
          if (response) {
            userData.value = response.perfils[0].perfilType.description;
          }
        })
        .catch((error) => {
          console.error(error);
        });
      if (localStorage.getItem("confirmedEmail") === "false") {
        _addMessageBox(
          "Atenção",
          "Confirmação de email não realizada",
          "Reenviar email de confirmação",
          "warning",
          "reconfirmEmail"
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
  
<style scoped>
@import "../../../styles/commom.css";

.dashboard-content {
  height: 100vh;
  color: var(--switch-elements-mode-secondary);
}
</style>