<template>
  <CardBox :title="'Lista de Usuários'" :description="'Manipule os registros de usuário'"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: 'Listar Usuários', link: '' }]">
    <genericTable :objHeader="headers" :objContents="contentTable" :options="optionsTable" :type="'object'"
      :orderBy="orderBy" @selectedLineObj="selectedLine($event)" @orderByField="getAllUsers($event)"
      @action="action($event)" @filterSearch="getAllUsers($event)" />
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
    const selectedLine = ref("");
    const orderBy = ref({
      field: "Name",
      order: true
    });
    const headers = ref([
      {
        displayName: "Id",
        name: "Id",
      },
      {
        displayName: "Nome",
        name: "Name",
      },
      {
        displayName: "Email",
        name: "Email",
      },
      {
        displayName: "Phone",
        name: "Phone",
      },
      {
        displayName: "Country",
        name: "Country",
      },
      {
        displayName: "Status",
        name: "Status",
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
      getAllUsers(event) {
        AccountService.getAllUsers(orderBy.value, ObjectUtils.getEvent(event?.search))
          .then((resp) => {
            methods.responseTable(resp);
          })
          .catch((ex) => {

          })
      },
      action(event) {
        console.log(event.action)
      },
      responseTable(response) {
        contentTable.value = response;
      },
      selectedLine(event) {
        selectedLine.value = event;
      }
    });

    onMounted(() => {
      methods.getAllUsers();
    });

    return {
      orderBy,
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