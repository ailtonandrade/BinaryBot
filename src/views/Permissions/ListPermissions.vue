<template>
  <CardBox :title="pageConfig.title" :description="pageConfig.description"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: pageConfig.title, link: '' }]">
    <genericTable :objHeader="headers" :objContents="contentTable" :options="optionsTable" :type="'object'"
      :orderBy="orderBy" :optionsPagination="pagination" @selectedLineObj="selectedLine($event)"
      @orderByField="getAll($event)" @togglePagination="getAll()" @action="action($event)"
      @filterSearch="getAll($event)" />
    <ModalPermission :reference="referenceModal" @execute="executeModal($event)" />
  </CardBox>
</template>

<script>
import { ref, inject, provide, onMounted, reactive, toRefs, computed } from "vue";
import PermissionService from "@/services/PermissionService";
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
    const referenceModal = ref("modal-permission");
    const openModalBox = inject("openModalBox");
    const openModalCustom = inject("openModalCustom");
    const addMessageBox = inject("addMessageBox");
    const configModalCustom = ref({});
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
        return [
          {
            icon: "fa-solid fa-add",
            label: "Inserir Permissão",
            action: "insert",
            disabled: false,
          },
        ];
      } else {
        return [
          {
            icon: "fa-solid fa-trash",
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
      getAll(event) {
        PermissionService.getAllPermissions(pagination.value, orderBy.value, ObjectUtils.getEvent(event?.search))
          .then((resp) => {
            pagination.value = resp;
            methods.responseTable(resp.dataSet);
          })
          .catch((ex) => {
            console.log(ex)
          })
      },
      handleActions(action) {
        switch (action) {
          case "edit", "remove": {
            return selectedLine.value == null
          }
        }
      },
      action(event) {
        switch (event.action) {
          case "insert": {
            configModalCustom.value = {
              title: "Inserir Permissão",
              reference: referenceModal.value,
              icon: "fa-solid fa-circle-exclamation",
              message: "Tem certeza que deseja inserir a permissão ?",
              action: methods.insertPermission,
            }
            openModalCustom(configModalCustom.value)
            break;
          }
          case "edit": {
            configModalCustom.value = {
              title: "Editar Permissão",
              reference: referenceModal.value,
              icon: "fa-solid fa-circle-exclamation",
              message: "Tem certeza que deseja editar a permissão ?",
              action: methods.editPermission,
              obj: selectedLine.value
            }
            openModalCustom(configModalCustom.value)
            break;
          }
          case "remove": {
            openModalBox({
              title: "Remover Permissão",
              icon: "fa-solid fa-circle-exclamation",
              message: "Tem certeza que deseja remover a permissão ?",
              description: selectedLine.value.Name,
              action: methods.removePermission,
            });
            break;
          }
        }
      },
      executeModal(event) {
        selectedLine.value = event;
        openModalBox({
          title: event.title,
          icon: event.icon,
          message: event.message,
          description: event.name,
          action: event.action,
        });
      },
      insertPermission() {
        PermissionService.insertPermission(selectedLine.value)
          .then((resp) => {
            addMessageBox(
              "Ok...",
              "Permissão inserida com sucesso.",
              null,
              "success",
              null
            );
            selectedLine.value = null;
            methods.getAll();
          })
          .catch((ex) => {
            addMessageBox(
              "Oops...",
              ex.message,
              null,
              "danger",
              null
            );
          })
      },
      editPermission() {
        PermissionService.editPermission(selectedLine.value)
          .then((resp) => {
            addMessageBox(
              "Ok...",
              "Permissão atualizada com sucesso.",
              null,
              "success",
              null
            );
            selectedLine.value = null;
            methods.getAll();
          })
          .catch((ex) => {
            addMessageBox(
              "Oops...",
              ex.message,
              null,
              "danger",
              null
            );
          })
      },
      removePermission() {
        PermissionService.removePermission(selectedLine.value)
          .then((resp) => {
            addMessageBox(
              "Ok...",
              "Permissão removida com sucesso.",
              null,
              "success",
              null
            );
            selectedLine.value = null;
            methods.getAll();
          })
          .catch((ex) => {
            addMessageBox(
              "Oops...",
              ex.message,
              null,
              "danger",
              null
            );
          })
      },
      responseTable(response) {
        contentTable.value = response;
      },
      selectedLine(event) {
        selectedLine.value = event;
      }
    });

    onMounted(() => {
      methods.getAll();
    });

    provide("pagination", pagination);
    provide("contentTable", contentTable);
    provide("configModalCustom", configModalCustom);

    return {
      pagination,
      pageConfig,
      router,
      orderBy,
      headers,
      referenceModal,
      addMessageBox,
      optionsTable,
      contentTable,
      selectedLine,
      openModalBox,
      configModalCustom,
      openModalCustom,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped></style>