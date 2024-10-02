<template>
  <CardBox :title="pageConfig.title" :description="pageConfig.description"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: pageConfig.title, link: '' }]">
    <genericTable :objHeader="headers" :objContents="contentTable" :options="optionsTable" :type="'object'"
      :orderBy="orderBy" :optionsPagination="pagination" @selectedLineObj="selectedLine($event)"
      @orderByField="getAll($event)" @togglePagination="getAll()" @action="action($event)"
      @filterSearch="getAll($event)" />
    <ModalData :reference="referenceModalData" @execute="executeModal($event)" />
    <ModalSetPermission :reference="referenceModalSetPerm" @execute="executeModal($event)" />
  </CardBox>
</template>

<script>
import { ref, inject, provide, onMounted, reactive, toRefs, computed } from "vue";
import PerfilService from "@/services/PerfilService";
import GenericTable from "@/views/components/GenericTable/GenericTable.vue";
import CardBox from "@/views/components/Layout/CardBox.vue";
import { useRouter } from "vue-router";
import ObjectUtils from "@/Utils/ObjectUtils";
import ModalData from "./components/ModalData.vue";
import ModalSetPermission from "./components/ModalSetPermission.vue";

export default {
  components: { CardBox, GenericTable, ModalData, ModalSetPermission },
  setup() {
    const router = useRouter();
    const pageConfig = ref({
      title: "Lista de Perfis",
      description: "Manipule os perfis de usuário do sistema"
    });
    const referenceModalData = ref("modal-data");
    const referenceModalSetPerm = ref("modal-set-permission");
    const openModalBox = inject("openModalBox");
    const openModalCustom = inject("openModalCustom");
    const addMessageBox = inject("addMessageBox");
    const configModalCustom = ref({});
    const selectedLine = ref("");
    const selectedPerms = ref([]);
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
            label: "Inserir Perfil",
            action: "insert",
            disabled: false,
          },
        ];
      } else {
        return [
          {
            icon: "fa-solid fa-sitemap",
            label: "Atribuir Permissões",
            action: "set-permission",
            disabled: methods.handleActions("set-permission"),
          },
          {
            icon: "fa-solid fa-trash",
            label: "Remover Perfil",
            action: "remove",
            disabled: methods.handleActions("remove"),
          },
          {
            icon: "fa-regular fa-edit",
            label: "Editar Perfil",
            action: "edit",
            disabled: methods.handleActions("edit"),
          },
        ]
      }
    });

    const methods = reactive({
      getAll(event) {
        PerfilService.getAllPerfils(pagination.value, orderBy.value, ObjectUtils.getEvent(event?.search))
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
              title: "Inserir Perfil",
              reference: referenceModalData.value,
              icon: "fa-solid fa-circle-exclamation",
              message: "Tem certeza que deseja inserir o perfil ?",
              action: methods.insertPerfil,
            }
            openModalCustom(configModalCustom.value)
            break;
          }
          case "edit": {
            configModalCustom.value = {
              title: "Editar Perfil",
              reference: referenceModalData.value,
              icon: "fa-solid fa-circle-exclamation",
              message: "Tem certeza que deseja editar a perfil ?",
              description: event.data?.Name,
              action: methods.editPerfil,
              obj: selectedLine.value
            }
            openModalCustom(configModalCustom.value)
            break;
          }
          case "remove": {
            openModalBox({
              title: "Remover Perfil",
              icon: "fa-solid fa-circle-exclamation",
              message: "Tem certeza que deseja remover a perfil ?",
              description: selectedLine.value.Name,
              action: methods.removePerfil,
            });
            break;
          }
          case "set-permission": {
            PerfilService.getPermissionsByPerfil(event.data?.Id)
              .then((resp) => {
                selectedPerms.value = resp ?? [];
                configModalCustom.value = {
                  reference: referenceModalSetPerm.value,
                  title: "Editar permissões para o perfil " + event.data?.Name,
                  icon: "edit",
                  message: "Tem certeza que deseja atribuir as rotas selecionadas ?",
                  action: methods.editPermission,
                  description: "",
                  obj: event.data,
                }
                openModalCustom(configModalCustom.value)
              })
              .catch((ex) => {
                console.log(ex);
              })
          }
        }
      },
      editPermission() {
        PerfilService.editPermission(selectedLine.value)
          .then((resp) => {
            addMessageBox(
              "Ok...",
              "Permissões atualizadas com sucesso !",
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
      executeModal(event) {
        selectedLine.value = event;
        openModalBox({
          title: event.title,
          icon: event.icon,
          message: event.message,
          description: event.description ?? event.name,
          action: event.action,
        });
      },
      insertPerfil() {
        PerfilService.insertPerfil(selectedLine.value)
          .then((resp) => {
            addMessageBox(
              "Ok...",
              "Perfil inserido com sucesso.",
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
      editPerfil() {
        PerfilService.editPerfil(selectedLine.value)
          .then((resp) => {
            addMessageBox(
              "Ok...",
              "Perfil atualizado com sucesso.",
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
      removePerfil() {
        PerfilService.removePerfil(selectedLine.value)
          .then((resp) => {
            addMessageBox(
              "Ok...",
              "Perfil removida com sucesso.",
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
    provide("selectedPerms", selectedPerms);
    provide("configModalCustom", configModalCustom);

    return {
      pagination,
      pageConfig,
      router,
      orderBy,
      headers,
      referenceModalData,
      referenceModalSetPerm,
      addMessageBox,
      optionsTable,
      contentTable,
      selectedPerms,
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