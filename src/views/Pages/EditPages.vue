<template>
  <CardBox :title="'Meus dados'" :description="'Editando Páginas'"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: 'Editar Páginas', link: 'edit-pages' }]">
    <div class="col-lg-9 col-12 px-2">
      <div v-for="(menu, indexMenu) in menus" :key="indexMenu" class="all-menus">
        <div class="col-12">
          <div>
            <div class="col-12 my-3 add">
              <font-awesome-icon class="" :icon="'fa-plus'" size="1x"></font-awesome-icon>
            </div>
          </div>
          <div class="d-flex align-center justify-content-center p-1 menus">
            <div class="col-4">
              <div class="b-shadow-1 flex-column justify-center icon-area-menu">
                <div class="d-flex justify-center py-1">
                  <font-awesome-icon class="" :icon="menu.icon ?? 'fa-regular fa-circle'" size="2x"></font-awesome-icon>
                </div>
                <small class="">Icon </small>
                <input class="form-control b-radius-top-0" :v-model="menu.icon" :value="menu.icon" />
              </div>
            </div>
            <div class="b-shadow-1 col-6 px-0">
              <div class="flex-column align-center justify-center icon-area-menu">
                <small class="px-1">Name </small>
                <input class="form-control small b-radius-top-0" :v-model="menu.name" :value="menu.name" />
                <small class="px-1">Display Name </small>
                <input class="form-control small b-radius-top-0" :v-model="menu.displayName"
                  :value="menu.displayName" />
              </div>
            </div>
            <div class="col-2">
              <font-awesome-icon class="save-btn" :icon="'fa-regular fa-save'"></font-awesome-icon>
            </div>
          </div>
        </div>
        <!-- SUBMENU -->
        <div v-for="(subMenu, indexSubMenu) in menu.subMenu" :key="indexSubMenu" class="">
          <div class="col-12 my-3">
            <div class="col-12 py-2 d-flex align-center justify-center submenus">
              <div class="col-1 d-flex justify-center my-3">
                <div class="col-4 add-sub">
                  <font-awesome-icon class="add-btn" :icon="'fa-plus'"></font-awesome-icon>
                </div>
              </div>
              <div class="col-4 px-1">
                <div class="flex-column justify-center icon-area-menu  b-shadow-1">
                  <div class="d-flex justify-center py-1">
                    <font-awesome-icon class="" :icon="subMenu.icon ?? 'fa-regular fa-circle'"
                      size="2x"></font-awesome-icon>
                  </div>
                  <small class="">Icon </small>
                  <input class="form-control b-radius-top-0" :v-model="subMenu.icon" :value="subMenu.icon" />
                </div>
              </div>
              <div class="col-6 px-1">
                <div class="flex-column align-center justify-center icon-area-menu  b-shadow-1">
                  <small class="">Name </small>
                  <input class="form-control small b-radius-top-0" :v-model="subMenu.name" :value="subMenu.name" />
                  <small class="">Display Name </small>
                  <input class="form-control small b-radius-top-0" :v-model="subMenu.displayName"
                    :value="subMenu.displayName" />
                </div>
              </div>
              <div class="col-1">
                <font-awesome-icon class="save-btn" :icon="'fa-regular fa-save'"></font-awesome-icon>
              </div>
            </div>
          </div>
          <!-- PAGE -->
          <div v-for="(page, indexPage) in subMenu.pages" :key="indexPage" class="">
            <div class="col-12 my-3 mx-1">
              <div class="col-12 px-1 d-flex align-center justify-content-center p-2 pages">
                <div class="col-1 d-flex justify-center my-3">
                  <div class="col-4 add-sub">
                    <font-awesome-icon :icon="'fa-plus'" size="1x"></font-awesome-icon>
                  </div>
                </div>
                <div class="col-4 px-1">
                  <div class="flex-column justify-center icon-area-menu  b-shadow-1">
                    <div class="d-flex justify-center py-1">
                      <font-awesome-icon class="" :icon="page.icon ?? 'fa-regular fa-circle'"
                        size="2x"></font-awesome-icon>
                    </div>
                    <small class="">Icon </small>
                    <input class="form-control b-radius-top-0" :v-model="page.icon" :value="page.icon" />
                  </div>
                </div>
                <div class="col-6 px-1">
                  <div class="flex-column align-center justify-center icon-area-menu  b-shadow-1">
                    <small class="">Name </small>
                    <input class="form-control small b-radius-top-0" :v-model="page.name" :value="page.name" />
                    <small class="">Display Name </small>
                    <input class="form-control small b-radius-top-0" :v-model="page.displayName"
                      :value="page.displayName" />
                  </div>
                </div>
                <div class="col-1">
                  <font-awesome-icon class="save-btn" :icon="'fa-regular fa-save'"></font-awesome-icon>
                </div>
              </div>
              <div class="d-flex justify-center decoration-primary-after b-radius-bottom-10">
                <small class="">/{{ menu.name }}/{{ subMenu.name }}/{{ page.name }}</small>
              </div>
            </div>
          </div>
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

.all-menus {
  padding: 20px 0px;
  border-radius: 10px;
  color: var(--switch-mode-elements-tertiary);
  background-color: var(--switch-mode-primary);
}

.menus {
  border-radius: 5px;
  border-left-style: solid;
  border-width: 10px;
  border-color: var(--decoration-primary);
  color: var(--switch-mode-elements-tertiary);
  background-color: var(--switch-mode-secondary);
}

.submenus {
  border-radius: 5px;
  border-left-style: solid;
  border-color: var(--decoration-primary-after);
  border-width: 2px;
  background-color: var(--switch-mode-secondary);
  overflow-x: hidden;
}

.pages {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-left-style: solid;
  border-width: 1px;
  border-color: var(--switch-mode-elements-tertiary);
  background-color: var(--switch-mode-secondary);
  overflow-x: hidden;
}

.icon-area-menu {
  border: dotted;
  margin: 0;
  padding: 0;
  border-color: var(--switch-mode-tertiary);
  border-width: 3px;
  border-radius: 10px;
}

input[type="text"] {
  background-color: var(--decoration-primary);
}

.add {
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: dotted;
  border-radius: 5px;
  border-width: 2px;
  background-color: var(--switch-mode-secondary);
  border-color: var(--switch-mode-elements-tertiary);
  opacity: 0.5;
  color: var(--switch-mode-elements-tertiary);
  cursor: pointer;
  transition: 0.2s;
}

.add:hover {
  background-color: var(--switch-mode-elements-tertiary);
  opacity: 1;
  color: var(--switch-mode-tertiary);
}

.add-sub {
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: dotted;
  border-radius: 5px;
  border-width: 2px;
  background-color: var(--switch-mode-secondary);
  border-color: var(--switch-mode-elements-tertiary);
  opacity: 0.5;
  color: var(--switch-mode-elements-tertiary);
  cursor: pointer;
  transition: 0.2s;
}

.add-sub:hover {
  background-color: var(--switch-mode-elements-tertiary);
  opacity: 1;
  color: var(--switch-mode-tertiary);
}

.save-btn {
  cursor: pointer;
  padding: 10px;
  color: var(--switch-elements-mode-primary);
  border-radius: 100%;
  margin-left: 50%;
  transform: translate(-50%);
  height: 25px;
  width: 25px;
  transition: 0.2s;
}

.save-btn:hover {
  color: var(--decoration-primary-after);
  background-color: var(--switch-mode-tertiary);
}
</style>