<template>
  <CardBox :title="'Meus dados'" :description="'Editando Páginas'"
    :breadcrumb="[{ name: 'Dashboard', link: 'dashboard' }, { name: 'Editar Páginas', link: 'edit-pages' }]">
    <div class="col-lg-9 col-12 px-2">
      <div>
        <div class="col-12 my-3 add-menu"
          @click="enjoyAction({ label: 'Adicionar Menu', obj: null, icon: 'plus', disabled: null, action: 'add-menu' })">
          <font-awesome-icon class="" :icon="'fa-plus'" size="1x"></font-awesome-icon>
        </div>
      </div>
      <div v-for="(menu, indexMenu) in menus" :key="menu.name" class="all-menus">
        <div class="col-12">
          <div class="d-flex align-center flex-space-evenly p-1 menus">
            <div class="col-4">
              <div class="b-shadow-1 flex-column justify-center icon-area-menu">
                <div class="d-flex justify-center py-1">
                  <font-awesome-icon class="" :icon="menu.icon ?? 'fa-regular fa-circle'" size="2x"></font-awesome-icon>
                </div>
                <small class="">Icon </small>
                <input class="form-control b-radius-top-0" @change="() => { menu.disabled = false }" v-model="menu.icon"
                  :placeholder="menu.icon" />
              </div>
            </div>
            <div class="col-6 px-1">
              <div class="flex-column align-center justify-center icon-area-menu b-shadow-1">
                <small class="px-1">Name </small>
                <input class="form-control small b-radius-top-0" @change="() => { menu.disabled = false }"
                  v-model="menu.name" :placeholder="menu.name" />
                <small class="px-1">Display Name </small>
                <input class="form-control small b-radius-top-0" @change="() => { menu.disabled = false }"
                  v-model="menu.displayName" :placeholder="menu.displayName" />
              </div>
            </div>
            <div class="col-2 d-flex justify-center">
              <OptionsMenu :id="menu.name" @enjoyAction="enjoyAction($event)" :icon="'gear'"
                :options="[{ label: 'Salvar alterações', obj: menu, icon: 'save', message: 'Tem certeza que deseja salvar as alterações ?', disabled: menu.disabled ?? true, action: 'save-changes-' + menu.name }, { label: 'Adicionar Sub Menu em /' + menu.name, obj: menu, icon: 'add', disabled: false, action: 'add-sub-' + menu.name }, { label: 'Remover Menu /' + menu.name, obj: menu, icon: 'trash', disabled: false, message: 'Tem certeza que deseja remover este Menu e todos os seus itens ?', action: 'remove-menu-' + menu.name }]" />
            </div>
          </div>
        </div>
        <!-- SUBMENU -->
        <div v-for="(subMenu, indexSubMenu) in menu.subMenu" :key="subMenu.name" class="">
          <div class="col-12 my-3">
            <div class="col-12 py-2 d-flex align-center flex-space-evenly submenus">
              <div class="col-4 px-1">
                <div class="flex-column justify-center icon-area-menu  b-shadow-1">
                  <div class="d-flex justify-center py-1">
                    <font-awesome-icon class="" :icon="subMenu.icon ?? 'fa-regular fa-circle'"
                      size="2x"></font-awesome-icon>
                  </div>
                  <small class="">Icon </small>
                  <input class="form-control b-radius-top-0" @change="() => { subMenu.disabled = false }"
                    v-model="subMenu.icon" :placeholder="subMenu.icon" />
                </div>
              </div>
              <div class="col-6 px-1">
                <div class="flex-column align-center justify-center icon-area-menu  b-shadow-1">
                  <small class="">Name </small>
                  <input class="form-control small b-radius-top-0" @change="() => { subMenu.disabled = false }"
                    v-model="subMenu.name" :placeholder="subMenu.name" />
                  <small class="">Display Name </small>
                  <input class="form-control small b-radius-top-0" @change="() => { subMenu.disabled = false }"
                    v-model="subMenu.displayName" :placeholder="subMenu.displayName" />
                </div>
              </div>
              <div class="col-2  d-flex justify-center">
                <OptionsMenu :id="subMenu.name" @enjoyAction="enjoyAction($event)" :icon="'gear'"
                  :options="[{ label: 'Salvar alterações', obj: subMenu, icon: 'save', message: 'Tem certeza que deseja salvar as alterações ?', disabled: subMenu.disabled ?? true, action: 'save-changes-' + subMenu.name }, { label: 'Adicionar Página em /' + subMenu.name, obj: subMenu, icon: 'add', disabled: false, action: 'add-page-' + subMenu.name }, { label: 'Remover Sub Menu /' + subMenu.name, obj: subMenu, icon: 'trash', disabled: false, message: 'Tem certeza que deseja remover este Sub Menu e todas as suas páginas ?', action: 'remove-sub-' + subMenu.name }]" />
              </div>
            </div>
          </div>
          <!-- PAGE -->
          <div v-for="(page, indexPage) in subMenu.pages" :key="page.name" class="">
            <div class="col-12 my-3 mx-1">
              <div class="col-12 px-1 d-flex align-center flex-space-evenly p-2 pages">
                <div class="col-4 px-1">
                  <div class="flex-column justify-center icon-area-menu  b-shadow-1">
                    <div class="d-flex justify-center py-1">
                      <font-awesome-icon class="" :icon="page.icon ?? 'fa-regular fa-circle'"
                        size="2x"></font-awesome-icon>
                    </div>
                    <small class="">Icon </small>
                    <input class="form-control b-radius-top-0" @change="() => { page.disabled = false }"
                      v-model="page.icon" :placeholder="page.icon" />
                  </div>
                </div>
                <div class="col-6 px-1">
                  <div class="flex-column align-center justify-center icon-area-menu  b-shadow-1">
                    <small class="">Name </small>
                    <input class="form-control small b-radius-top-0" @change="() => { page.disabled = false }"
                      v-model="page.name" :placeholder="page.name" />
                    <small class="">Display Name </small>
                    <input class="form-control small b-radius-top-0" @change="() => { page.disabled = false }"
                      v-model="page.displayName" :placeholder="page.displayName" />
                  </div>
                </div>
                <div class="col-2 d-flex justify-center">
                  <OptionsMenu :id="page.name" @enjoyAction="enjoyAction($event)" :icon="'gear'"
                    :options="[{ label: 'Salvar alterações', obj: page, icon: 'save', disabled: page.disabled ?? true, message: 'Tem certeza que deseja salvar as alterações ?', action: 'save-changes-' + page.name }, { label: 'Remover Página /' + page.name, obj: page, icon: 'trash', disabled: false, message: 'Tem certeza que deseja remover esta página ?', action: 'remove-page-' + page.name }]" />
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
    <ModalConfirmActionPage :reference="reference" @execute="execute($event)" />
  </CardBox>
</template>

<script>
import { ref, inject, watch, onMounted, reactive, toRefs, provide } from "vue";
import MenuService from "@/services/MenuService";
import CardBox from "@/views/components/Layout/CardBox.vue";
import auxiliar from "@/global/auxiliar";
import { useRouter, useRoute } from "vue-router";
import ObjectUtils from "@/Utils/ObjectUtils";
import OptionsMenu from "../components/GenericTable/Components/OptionsMenu.vue";
import ModalConfirmActionPage from "./components/ModalConfirmActionPage.vue";

export default {
  name: "EditPages",
  components: { CardBox, OptionsMenu, ModalConfirmActionPage },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const addMessageBox = inject("addMessageBox");

    const reference = ref("action-page");
    const configModalCustom = ref({});
    const openModalCustom = inject("openModalCustom");

    const menus = ref([]);

    const methods = reactive({
      enjoyAction(event) {
        console.log("event")
        console.log(event)
        configModalCustom.value = {
          reference: reference.value,
          title: event?.label,
          icon: event?.icon,
          message: event?.message,
          action: event?.action,
          description: "",
          obj: event?.obj,
        }
        openModalCustom(configModalCustom.value)
      },
      execute(event) {
        console.log("execute");
        console.log(event);
      }
    });

    provide("configModalCustom", configModalCustom);

    onMounted(() => {
      MenuService.getAllMenu()
        .then((response) => {
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
      reference,
      openModalCustom,
      configModalCustom,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped></style>