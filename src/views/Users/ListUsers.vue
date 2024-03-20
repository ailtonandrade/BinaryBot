<template>
  <CardBox :title="'Lista de Usuários'" :description="'Manipule os registros de usuário'"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: 'Listar Usuários', link: '' }]">
    <genericTable :objHeader="headers" :objContents="contentTable" :options="optionsTable" :type="'object'"
      @selectedLineObj="selectedLine($event)" @action="action($event)" />
  </CardBox>
</template>

<script>
import { ref, inject, watch, onMounted, reactive, toRefs, computed } from "vue";
import AccountService from "@/services/AccountService";
import GenericTable from "@/views/components/Layout/GenericTable.vue";
import CardBox from "@/views/components/Layout/CardBox.vue";
import auxiliar from "@/global/auxiliar";
import { useRouter } from "vue-router";
import ObjectUtils from "@/Utils/ObjectUtils";

export default {
  components: { CardBox, GenericTable },
  setup() {
    const router = useRouter();
    const addMessageBox = inject("addMessageBox");
    const selectedLine = ref(null);
    const headers = ref([
      {
        displayName: "Id",
        name: "ID",
        order: "desc",
        orderDefault: true
      },
      {
        displayName: "Nome",
        name: "NOME",
      },
      {
        displayName: "Coisas",
        name: "COISAS",
      },
    ]);
    const contentTable = ref([]);
    const optionsTable = computed(() => {
      return [
        {
          icon: "fa-solid fa-plus",
          label: "Ativar usuário",
          action: "activeUser",
          disabled: !selectedLine.value,
        },
        {
          icon: "fa-regular fa-trash-alt",
          label: "Desativar usuário",
          action: "removeUser",
          disabled: !selectedLine.value,
        },
        {
          icon: "fa-regular fa-edit",
          label: "Editar usuário",
          action: "editUser",
          disabled: false,
        },

        {
          icon: "fa-regular fa-edit",
          label: "Editar usuário",
          action: "editUser",
          disabled: false,
        },

        {
          icon: "fa-regular fa-edit",
          label: "Editar usuário",
          action: "editUser",
          disabled: false,
        },
      ]
    });

    const methods = reactive({
      getAllUsers(){
        AccountService.getAllUsers()
        .then((resp) => {
          console.log(resp);
        })
        .catch((ex) => {
          console.log(ex);
        })
      },
      action(event) {
        console.log(event.action)
      },
      selectedLine(event) {
        selectedLine.value = event;
      }
    });

    onMounted(() => {
      methods.getAllUsers();
    });

    return {
      headers,
      optionsTable,
      contentTable,
      selectedLine,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped></style>