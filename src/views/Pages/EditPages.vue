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
      <div v-for="(menu, indexMenu) in menus" :key="menu.id" class="all-menus">
        <div class="col-12">
          <div class="d-flex align-center flex-space-evenly p-1 menus">
            <div class="col-4">
              <div class="b-shadow-1 flex-column justify-center icon-area-menu">
                <div class="d-flex justify-center py-1">
                  <font-awesome-icon class="" :icon="menu.icon ?? 'fa-regular fa-circle'" size="2x"></font-awesome-icon>
                </div>
                <label :for="'input-menu-icon'+menu.name+indexMenu" class="small">Icon </label>
                <input :id="'input-menu-icon'+menu.name+indexMenu" class="form-control b-radius-top-0" @change="() => { menu.disabled = false }" v-model="menu.icon"
                  :placeholder="menu.icon" />
              </div>
            </div>
            <div class="col-6 px-1">
              <div class="flex-column align-center justify-center icon-area-menu b-shadow-1">
                <label :for="'input-menu-name'+menu.name+indexMenu" class="small px-1">Name </label>
                <input :id="'input-menu-name'+menu.name+indexMenu" class="form-control small b-radius-top-0" @change="() => { menu.disabled = false }"
                  v-model="menu.name" :placeholder="menu.name" />
                <label :for="'input-menu-displayname'+menu.name+indexMenu" class="small px-1">Display Name </label>
                <input :id="'input-menu-displayname'+menu.name+indexMenu" class="form-control small b-radius-top-0" @change="() => { menu.disabled = false }"
                  v-model="menu.displayName" :placeholder="menu.displayName" />
              </div>
            </div>
            <div class="col-2 d-flex justify-center">
              <OptionsMenu :id="menu.name" @enjoyAction="enjoyAction($event)" :icon="'gear'"
                :options="[{ label: 'Salvar alterações', obj: menu, icon: 'save', message: 'Tem certeza que deseja salvar as alterações ?', disabled: menu.disabled ?? true, action: 'save-menu-' + menu.name }, { label: 'Adicionar Sub Menu em /' + menu.name, obj: menu, icon: 'add', disabled: false, action: 'add-sub-' + menu.name }, { label: 'Remover Menu /' + menu.name, obj: menu, icon: 'trash', disabled: false, message: 'Tem certeza que deseja remover este Menu e todos os seus itens ?', action: 'remove-menu-' + menu.name }]" />
            </div>
          </div>
          <div v-if="menu.subMenu?.length === 0"
            class="decoration-primary-after b-radius-bottom-10">
            <div class="row d-flex justify-content-center align-center text-center p-1">
              <small :id="'footer-'+menu.name+indexMenu" class="col-lg-6 col-md-6 col-12 handle-edit-permissions" @click="enjoyEditPerm(menu.id)">Editar
                permissões</small>
              <small class="col-lg-6 col-md-6 col-12">/{{ menu.name }}</small>
            </div>
          </div>
        </div>
        <!-- SUBMENU -->
        <div v-for="(subMenu, indexSubMenu) in menu.subMenu" :key="subMenu.id" class="">
          <div class="col-12 my-3">
            <div class="col-12 py-2 d-flex align-center flex-space-evenly submenus">
              <div class="col-4 px-1">
                <div class="flex-column justify-center icon-area-menu  b-shadow-1">
                  <div class="d-flex justify-center py-1">
                    <font-awesome-icon class="" :icon="subMenu.icon ?? 'fa-regular fa-circle'"
                      size="2x"></font-awesome-icon>
                  </div>
                  <label :for="'input-submenu-icon'+subMenu.name+indexSubMenu" class="small">Icon </label>
                  <input :id="'input-submenu-icon'+subMenu.name+indexSubMenu" class="form-control b-radius-top-0" @change="() => { subMenu.disabled = false }"
                    v-model="subMenu.icon" :placeholder="subMenu.icon" />
                </div>
              </div>
              <div class="col-6 px-1">
                <div class="flex-column align-center justify-center icon-area-menu  b-shadow-1">
                  <label :for="'input-submenu-name'+subMenu.name+indexSubMenu" class="small">Name </label>
                  <input :id="'input-submenu-name'+subMenu.name+indexSubMenu" class="form-control small b-radius-top-0" @change="() => { subMenu.disabled = false }"
                    v-model="subMenu.name" :placeholder="subMenu.name" />
                  <label :for="'input-submenu-displayname'+subMenu.name+indexSubMenu" class="small">Display Name </label>
                  <input :id="'input-submenu-displayname'+subMenu.name+indexSubMenu" class="form-control small b-radius-top-0" @change="() => { subMenu.disabled = false }"
                    v-model="subMenu.displayName" :placeholder="subMenu.displayName" />
                </div>
              </div>
              <div class="col-2  d-flex justify-center">
                <OptionsMenu :id="subMenu.name" @enjoyAction="enjoyAction($event)" :icon="'gear'"
                  :options="[{ label: 'Salvar alterações', obj: subMenu, icon: 'save', message: 'Tem certeza que deseja salvar as alterações ?', disabled: subMenu.disabled ?? true, action: 'save-sub-' + subMenu.name }, { label: 'Adicionar Página em /' + subMenu.name, obj: subMenu, icon: 'add', disabled: false, action: 'add-page-' + subMenu.name }, { label: 'Remover Sub Menu /' + subMenu.name, obj: subMenu, icon: 'trash', disabled: false, message: 'Tem certeza que deseja remover este Sub Menu e todas as suas páginas ?', action: 'remove-sub-' + subMenu.name }]" />
              </div>
            </div>
            <div v-if="subMenu.pages?.length === 0" class="col-12 decoration-primary-after b-radius-bottom-10">
              <div class="row d-flex justify-content-center align-center text-center p-1">
                <small :id="'footer-'+subMenu.name+indexSubMenu" class="col-lg-6 col-md-6 col-12 handle-edit-permissions"
                  @click="enjoyEditPerm(menu.id, subMenu.id)">Editar permissões</small>
                <small class="col-lg-6 col-md-6 col-12 ">/{{ menu.name }}/{{ subMenu.name }}</small>
              </div>
            </div>
          </div>
          <!-- PAGE -->
          <div v-for="(page, indexPage) in subMenu.pages" :key="page.id" class="">
            <div class="col-12 my-3 mx-1">
              <div class="col-12 px-1 d-flex align-center flex-space-evenly p-2 pages">
                <div class="col-4 px-1">
                  <div class="flex-column justify-center icon-area-menu  b-shadow-1">
                    <div class="d-flex justify-center py-1">
                      <font-awesome-icon class="" :icon="page.icon ?? 'fa-regular fa-circle'"
                        size="2x"></font-awesome-icon>
                    </div>
                    <label :for="'input-page-icon'+page.name+indexPage" class="small">Icon </label>
                    <input :id="'input-page-icon'+page.name+indexPage" class="form-control b-radius-top-0" @change="() => { page.disabled = false }"
                      v-model="page.icon" :placeholder="page.icon" />
                  </div>
                </div>
                <div class="col-6 px-1">
                  <div class="flex-column align-center justify-center icon-area-menu  b-shadow-1">
                    <label :for="'input-page-name'+page.name+indexPage" class="small">Name </label>
                    <input :id="'input-page-name'+page.name+indexPage" class="form-control small b-radius-top-0" @change="() => { page.disabled = false }"
                      v-model="page.name" :placeholder="page.name" />
                    <label :for="'input-page-displayname'+page.name+indexPage" class="small">Display Name </label>
                    <input :id="'input-page-displayname'+page.name+indexPage" class="form-control small b-radius-top-0" @change="() => { page.disabled = false }"
                      v-model="page.displayName" :placeholder="page.displayName" />
                  </div>
                </div>
                <div class="col-2 d-flex justify-center">
                  <OptionsMenu :id="page.name" @enjoyAction="enjoyAction($event)" :icon="'gear'"
                    :options="[{ label: 'Salvar alterações', obj: page, icon: 'save', disabled: page.disabled ?? true, message: 'Tem certeza que deseja salvar as alterações ?', action: 'save-page-' + page.name }, { label: 'Remover Página /' + page.name, obj: page, icon: 'trash', disabled: false, message: 'Tem certeza que deseja remover esta página ?', action: 'remove-page-' + page.name }]" />
                </div>
              </div>
              <div class="decoration-primary-after b-radius-bottom-10">
                <div class="row d-flex justify-content-center align-center text-center py-1 px-5">
                  <small :id="'footer-'+page.name+indexPage" class="col-lg-6 col-md-6 col-12 handle-edit-permissions"
                    @click="enjoyEditPerm(menu.id, subMenu.id, page.id)">
                    Editar permissões</small>
                  <small class="col-lg-6 col-md-6 col-12">/{{ menu.name }}/{{ subMenu.name }}/{{ page.name }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalConfirmActionPage :reference="reference" @execute="execute($event)" />
    <ModalEditPermission :reference="referenceEditPerm" @execute="execute($event)" />
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
import ModalEditPermission from "./components/ModalEditPermission.vue";

export default {
  name: "EditPages",
  components: { CardBox, OptionsMenu, ModalConfirmActionPage, ModalEditPermission },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const addMessageBox = inject("addMessageBox");

    const reference = ref("action-page");
    const referenceEditPerm = ref("edit-permissions")
    const configModalCustom = ref({});
    const selectedPerms = ref([]);
    const openModalCustom = inject("openModalCustom");

    const menus = ref([]);

    const methods = reactive({
      getAllMenu() {
        MenuService.getAllMenu()
          .then((response) => {
            console.log(response)
            menus.value = response;
          })
          .catch((err) => {
            console.error(err)
          })
      },
      enjoyEditPerm(menuId, subMenuId, pageId) {
        MenuService.getPermissionsByMenu(menuId, subMenuId, pageId)
          .then((resp) => {
            selectedPerms.value = resp ?? [];
            configModalCustom.value = {
              reference: referenceEditPerm.value,
              title: "Editar permissões de rota",
              icon: "edit",
              message: "",
              action: "confirm-edit-permission",
              description: "",
              obj: selectedPerms.value,
            }
            openModalCustom(configModalCustom.value)
          })
          .catch((ex) => {
            console.log(ex);
          })
      },
      enjoyAction(event) {
        console.log("aaa")
        configModalCustom.value = {
          reference: reference.value,
          title: event?.label,
          icon: event?.icon,
          message: event?.message,
          action: event?.action,
          description: "",
          obj: JSON.parse(JSON.stringify(event?.obj)),
        }
        openModalCustom(configModalCustom.value)
      },
      execute(event) {
        MenuService.editMenus(event)
          .then((resp) => {
            console.log(resp);
            methods.getAllMenu();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    });

    provide("configModalCustom", configModalCustom);
    provide("selectedPerms", selectedPerms);

    onMounted(() => {
      methods.getAllMenu();
    });

    return {
      menus,
      route,
      router,
      reference,
      selectedPerms,
      referenceEditPerm,
      openModalCustom,
      configModalCustom,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped>
.handle-edit-permissions {
  cursor: pointer;
  user-select: none;
  transition: 0.2s;
  text-decoration: none;
  border-radius: 5px;
}

.handle-edit-permissions:hover {
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  text-decoration: underline;
  background-color: var(--decoration-primary);
}
</style>