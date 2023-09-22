<template>
  <div>
    <div>
      <Menu></Menu>
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
import { ref, computed, onMounted, toRefs, reactive, inject, defineComponent } from "vue";
import { useRouter } from "vue-router";
import Menu from "../../components/menu.vue";
import { Perfils } from "../../../enums/perfils";
import AdminBoard from "./adminBoard/adminBoard.vue";
import AuthService from "../../../services/AuthService";

export default defineComponent({
  components: {
    Menu,
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
        _listMessageBox.value.push({
          title: "Atenção",
          message: "Confirmação de email não realizada",
          btnText: "Reenviar email de confirmação",
          modalBoxClass: "warning",
          func: "reconfirmEmail",
        });
        _showModalBox();
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
  