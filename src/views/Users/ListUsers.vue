<template>
  <CardBox :title="'Lista de Usuários'" :description="'Manipule os registros de usuário'"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: 'Listar Usuários', link: '' }]">
    <genericTable :objHeader="headers" :objContents="contentTable" :options="optionsTable" :type="'object'"
      @action="action($event)" />
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
    const selectedLine = ref();
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
    const contentTable = ref([
      {
        id: 0,
        nome: "teste",
        coisas: "115616516165"
      },
      {
        id: 1,
        nome: "teste 1",
        coisas: "888786516165"
      },
      {
        id: 2,
        nome: "teste",
        coisas: "115616516165"
      },
      {
        id: 3,
        nome: "teste 1",
        coisas: "888786516165"
      },
      {
        id: 4,
        nome: "teste",
        coisas: "115616516165"
      },
      {
        id: 5,
        nome: "teste 1",
        coisas: "888786516165"
      },
      {
        id: 6,
        nome: "teste",
        coisas: "115616516165"
      },
      {
        id: 7,
        nome: "teste 1",
        coisas: "888786516165"
      },
      {
        id: 8,
        nome: "teste",
        coisas: "115616516165"
      },
      {
        id: 9,
        nome: "teste 1",
        coisas: "888786516165"
      },
      {
        id: 10,
        nome: "teste",
        coisas: "115616516165"
      },
      {
        id: 11,
        nome: "teste 1",
        coisas: "888786516165"
      },
      {
        id: 12,
        nome: "teste",
        coisas: "115616516165"
      },
      {
        id: 3,
        nome: "teste 1",
        coisas: "888786516165"
      },
      {
        id: 14,
        nome: "teste",
        coisas: "115616516165"
      },
      {
        id: 15,
        nome: "teste 1",
        coisas: "888786516165"
      },
      {
        id: 16,
        nome: "teste",
        coisas: "115616516165"
      },
      {
        id: 17,
        nome: "teste 1",
        coisas: "888786516165"
      },
      {
        id: 18,
        nome: "teste",
        coisas: "115616516165"
      },
      {
        id: 19,
        nome: "teste 1",
        coisas: "888786516165"
      },
      {
        id: 20,
        nome: "teste",
        coisas: "115616516165"
      },
      {
        id: 21,
        nome: "teste 1",
        coisas: "888786516165"
      },
    ]);
    const optionsTable = ref([
      {
        icon: "fa-solid fa-plus",
        label: "Ativar usuário",
        action: "activeUser",
        disabled: false,
      },
      {
        icon: "fa-regular fa-trash-alt",
        label: "Desativar usuário",
        action: "removeUser",
        disabled: false,
      },
      {
        icon: "fa-regular fa-edit",
        label: "Editar usuário",
        action: "editUser",
        disabled: false,
      },
    ]);
    const methods = reactive({
      action(event) {
        console.log(event)
      }
    });

    onMounted(() => {
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