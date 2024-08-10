<template>
  <CardBox :title="'Meus dados'" :description="'Editando Páginas'"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: 'Editar Páginas', link: 'edit-pages' }]">
    <div class="flex menus">
      <div v-for="(menu, indexMenu) in menus" :key="indexMenu">
        <div>
          <font-awesome-icon class="px-2 icon-area-menu" :icon=" menu.icon ?? 'fa-regular fa-circle'"
          size="1x"></font-awesome-icon>
          <span>
            <b>Name: </b>
            <span>{{ menu.name }}</span>
          </span>
          <br>
          <span>
            <b>Display Name: </b>
            <span>{{ menu.displayName }}</span>
          </span>
          <br>
          <span>
            <b>Icon: </b>
            <span>{{ menu.icon }}</span>
          </span>
        </div>
      </div>
    </div>
  </CardBox>
</template>

<script>
import { ref, inject, watch, onMounted, reactive, toRefs, computed } from "vue";
import MenuService from "@/services/MenuService";
import CardBox from "@/views/components/Layout/CardBox.vue";
import auxiliar from "@/global/auxiliar";
import { useRouter, useRoute } from "vue-router";
import ObjectUtils from "@/Utils/ObjectUtils";

export default {
  name: "EditPages",
  components: { CardBox },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const addMessageBox = inject("addMessageBox");
    const menus = ref([]);

    const methods = reactive({

    });

    onMounted(() => {
      MenuService.getAllMenu()
        .then((response) => {
          console.log(response)
          menus.value = response;
        })
        .catch((err) => {
          console.error(err)
        })
    });

    return {
      menus,
      route,
      router,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped>
.separator {
  padding: 0 10px;
}
.menus{
  padding: 5px;
  border-radius: 10px;
  color: var(--switch-mode-elements-tertiary);
  background-color: var(--switch-mode-primary);
}
.icon-area-menu{
  padding: 5px;
  margin: 5px;
  border: dotted;
  border-width: 1px;
  border-radius: 10%;
}
</style>