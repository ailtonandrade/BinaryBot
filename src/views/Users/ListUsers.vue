<template>
  <CardBox :title="'Lista de Usuários'" :description="'Manipule os registros de usuário'"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: 'Listar Usuários', link: '' }]">
    <genericTable :objHeader="headers" :objContents="contentTable" :options="optionsTable" :type="'object'"
      :orderBy="orderBy" :optionsPagination="pagination" @selectedLineObj="selectedLine($event)"
      @orderByField="getAllUsers($event)" @togglePagination="getAllUsers()" @action="action($event)"
      @filterSearch="getAllUsers($event)" />
  </CardBox>
</template>

<script>
import { ref, inject, provide, onMounted, reactive, toRefs, computed } from "vue";
import AccountService from "@/services/AccountService";
import GenericTable from "@/views/components/GenericTable/GenericTable.vue";
import CardBox from "@/views/components/Layout/CardBox.vue";
import auxiliar from "@/global/auxiliar";
import { useRouter } from "vue-router";
import ObjectUtils from "@/Utils/ObjectUtils";

export default {
  components: { CardBox, GenericTable },
  setup() {
    const router = useRouter();
    const openModalBox = inject("openModalBox");
    const clearModalBox = inject("clearModalBox");
    const selectedLine = ref("");
    const pagination = ref({
      offset: 0,
      maxItems: 0,
      limit: 0,
      limitOptions: [],
      offsetOptions: []
    });
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
          action: "activate",
          disabled: methods.handleActions("activate"),
        },
        {
          icon: "fa-regular fa-trash-alt",
          label: "Desativar usuário",
          action: "inactivate",
          disabled: methods.handleActions("inactivate"),
        },
        {
          icon: "fa-regular fa-edit",
          label: "Editar usuário",
          action: "edit",
          disabled: methods.handleActions("edit"),
        },
      ]
    });

    const methods = reactive({
      getAllUsers(event) {
        AccountService.getAllUsers(pagination.value, orderBy.value, ObjectUtils.getEvent(event?.search))
          .then((resp) => {
            pagination.value = resp;
            methods.responseTable(resp.dataSet);
          })
          .catch((ex) => {

          })
      },
      handleActions(action) {
        switch (action) {
          case "activate": {
            return !selectedLine.value || selectedLine.value.Status
          }
          case "inactivate": {
            return !selectedLine.value || !selectedLine.value.Status
          }
          case "edit": {
            return !selectedLine.value
          }
        }
      },
      action(event) {
        let obj = {};
        switch (event.action) {
          case "activate": {
            obj = {
              title: "Ativação de usuário",
              icon: "",
              message: "Tem certeza que deseja desativar o usuário: " + selectedLine.value.UserName,
              description: selectedLine.value.Name,
              action: methods.activateUser,
            }
            break;
          }
          case "inactivate": {
            obj = {
              title: "Desativação de usuário",
              icon: "",
              message: "Tem certeza que deseja desativar o usuário:",
              description: selectedLine.value.Name,
              action: methods.inactivateUser,
            }
            break;
          }
          case "edit": {
            methods.editUser();
            break;
          }
        }
        openModalBox(obj);
      },
      activateUser() {
        console.log("ativando o usuario")

      },
      inactivateUser() {
        console.log("inativando o usuario")
      },
      editUser() {
        console.log("editando o usuario")
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

    provide("pagination", pagination);
    return {
      pagination,
      orderBy,
      headers,
      optionsTable,
      contentTable,
      selectedLine,
      openModalBox,
      clearModalBox,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped></style>