<template>
  <CardBox :title="pageConfig.title" :description="pageConfig.description"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: pageConfig.title, link: '' }]">
    <genericTable :objHeader="headers" :objContents="contentTable" :options="optionsTable" :type="'object'"
      :orderBy="orderBy" :optionsPagination="pagination" @selectedLineObj="selectedLine($event)"
      @orderByField="getAllUsers($event)" @togglePagination="getAllUsers()" @action="action($event)"
      @filterSearch="getAllUsers($event)" />
    <ModalPermission :reference="'modal-permission'" @execute="executeModal($event)" />
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
import ModalPermission from "./components/ModalPermission.vue";

export default {
  components: { CardBox, GenericTable, ModalPermission },
  setup() {
    const router = useRouter();
    const pageConfig = ref({
      title: "Lista de Permissões",
      description: "Manipule as permissões do sistema"
    });
    const openModalBox = inject("openModalBox");
    const addMessageBox = inject("addMessageBox");
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
        displayName: "Descrição",
        name: "Descrição",
      },
    ]);
    const contentTable = ref([]);
    const optionsTable = computed(() => {
      if (!selectedLine.value) {
        return [];
      } else {
        return [
          {
            icon: "fa-regular fa-edit",
            label: "Inserir Permissão",
            action: "insert",
            disabled: methods.handleActions("insert"),
          },
          {
            icon: "fa-regular fa-edit",
            label: "Remover Permissão",
            action: "remove",
            disabled: methods.handleActions("remove"),
          },
          {
            icon: "fa-regular fa-edit",
            label: "Editar Permissão",
            action: "edit",
            disabled: methods.handleActions("edit"),
          },
        ]
      }
    });

    const methods = reactive({
      getAllPermissions(event) {
        PermissionService.getAllPermissions(pagination.value, orderBy.value, ObjectUtils.getEvent(event?.search))
          .then((resp) => {
            pagination.value = resp;
            methods.responseTable(resp.dataSet);
          })
          .catch((ex) => {

          })
      },
      handleActions(action) {
        switch (action) {
          case "insert", "edit", "remove": {
            return selectedLine.value == null
          }
        }
      },
      action(event) {
        let obj = {};
        switch (event.action) {
          case "insert": {
            openModalBox({
              title: "Inserir Permissão",
              icon: "fa-solid fa-circle-exclamation",
              message: "Tem certeza que deseja inserir a permissão ?",
              description: selectedLine.value.Name,
              action: methods.insertPermission(selectedLine.value),
            });
            break;
          }
          case "edit": {
            openModalBox({
              title: "Editar Permissão",
              icon: "fa-solid fa-circle-exclamation",
              message: "Tem certeza que deseja editar a permissão ?",
              description: selectedLine.value.Name,
              action: methods.editPermission(selectedLine.value),
            });
            break;
          }
          case "remove": {
            openModalBox({
              title: "Remover Permissão",
              icon: "fa-solid fa-circle-exclamation",
              message: "Tem certeza que deseja remover a permissão ?",
              description: selectedLine.value.Name,
              action: methods.removePermission(selectedLine.value),
            });
            break;
          }
        }
      },
      executeModal(event) {
        console.log("event");
        console.log(event);
      },
      insertPermission(data) {
        console.log("inserir permissão: " + data.Id)
      },
      editPermission(data) {
        console.log("editar permissão: " + data.Id)
      },
      removePermission(data) {
        console.log("remover permissão: " + data.Id)
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
      pageConfig,
      router,
      orderBy,
      headers,
      addMessageBox,
      optionsTable,
      contentTable,
      selectedLine,
      openModalBox,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped></style>