<template>
  <card-box :title="title" :description="description" :breadcrumb="[{ name: 'Dashboard', link: '' }]">
    <div class="container-fluid">
      <div class="col-12">
        <div class="b-card b-column-center overflow-hidden">
          <div class="b-marquee">
            <MarqueeList></MarqueeList>
          </div>
        </div>
      </div>
      <div class="col-12 dashboard-content">
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
  </card-box>
</template>
  
<script>
import {
  ref,
  emit,
  computed,
  onMounted,
  toRefs,
  reactive,
  inject,
  defineComponent,
} from "vue";
import { useRouter } from "vue-router";
import { Perfils } from "@/enums/perfils";
import AdminBoard from "./adminBoard/adminBoard.vue";
import AuthService from "@/services/AuthService";
import DashboardService from "@/services/DashboardService";
import CardBox from "@/views/components/Layout/CardBox.vue";
import MarqueeList from "@/views/dashboard/components/MarqueeList.vue";

export default defineComponent({
  components: {
    MarqueeList,
    AdminBoard,
    CardBox,
  },
  setup(props, { emit }) {
    const title = ref("Painel");
    const description = ref("Informações de conta.");
    const router = useRouter();
    const userData = ref();
    //modal box
    const showModalBox = inject("showModalBox");
    //message box
    const addMessageBox = inject("addMessageBox");
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
      checkMessageBox() {
        if (localStorage.getItem("confirmedEmail") === "false") {
          addMessageBox(
            "Atenção",
            "Confirmação de email não realizada",
            "Reenviar email de confirmação",
            "warning",
            "reconfirmEmail"
          );
        }
      },
      getAllPerfil() {
        AuthService.getPerfil()
          .then((response) => {
            if (response) {
              userData.value = response.perfils[0].perfilType.description;
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });

    onMounted(() => {
      methods.getAllPerfil();
      methods.checkMessageBox();
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
.dashboard-content {
  display: flex;
  justify-content: center;
  height: 100vh;
  border-radius: 10px;
  color: var(--switch-elements-mode-secondary);
}
</style>