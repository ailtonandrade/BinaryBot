<template>
  <main>
    <SwitchMode></SwitchMode>
    <Menu v-if="isLoggedIn" class="menu"></Menu>
    <div v-if="isLoggedIn" class="toggle-side-menu" :class="showSideMenu ? 'open' : ''">
      <ToggleSideMenu v-if="isLoggedIn" />
      <SideMenu v-if="isLoggedIn" :listMenu="_listSideMenu" class="side-menu" />
    </div>
    <div class="router-view" :class="isLoggedIn ? 'p-t-custom' : 'p-0'">
      <router-view>
      </router-view>
    </div>
    <MessageBox class="message-box" v-if="_listMessageBox.length > 0" :listMessageBox="_listMessageBox"
      @action="actionMessageBox($event)" @closeMessageBox="closeMessageBox()" />
    <ModalBox v-if="_showModalBox" @closeModal="closeModalBox()" :title="_dataModalBox.title" :icon="_dataModalBox.icon"
      :message="_dataModalBox.message" :description="_dataModalBox.description" :action="_dataModalBox.action"
      class="modal-box" />
  </main>
</template>
<script>
import {
  computed,
  watch,
  provide,
  reactive,
  ref,
  toRefs,
  inject,
  onMounted,
} from "vue";
import ModalBox from "./views/components/ModalBox.vue";
import MessageBox from "./views/components/MessageBox.vue";
import SwitchMode from "./views/components/SwitchMode.vue";
import Menu from "./views/components/menu/Menu.vue";
import ToggleSideMenu from "./views/components/SideMenu/components/ToggleSideMenu.vue";
import SideMenu from "./views/components/SideMenu/SideMenu.vue";
import AuthService from "./services/AuthService";
import { useRouter } from "vue-router";
import auxiliar from "./global/auxiliar";
import { faLaptopHouse } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "App",
  components: { Menu, ModalBox, MessageBox, SideMenu, ToggleSideMenu, SwitchMode },
  setup() {
    const isLoggedIn = ref(false);
    const _showModalBox = ref(false);
    const isDarkMode = ref(true);
    const showMainBar = ref(false);
    const router = useRouter();
    const _dataModalBox = ref({
      title: "",
      message: "",
      action: "",
      description: "",
    });

    const _listMessageBox = ref([]);
    const _actionMessageBox = ref();

    const _listSideMenu = ref([]);
    const showSideMenu = ref(false);

    const methods = reactive({
      closeModalBox() {
        _showModalBox.value = false;
      },
      showModalBox(title, message, description, icon, action) {
        _dataModalBox.value.title = title;
        _dataModalBox.value.message = message;
        _dataModalBox.value.description = description;
        _dataModalBox.value.action = action;
        _dataModalBox.value.icon = icon;
        _showModalBox.value = true;
      },
      addMessageBox(title, message, btnText, modalBoxClass, funcEmit) {
        _listMessageBox.value.push({
          title: title,
          message: message,
          btnText: btnText,
          modalBoxClass: modalBoxClass,
          funcEmit: funcEmit,
        });
        setTimeout(() => {
          _listMessageBox.value.pop();
        }, 3000);
      },
      clearMessageBox() {
        _listMessageBox.value = [];
      },
      clearModalBox() {
        _showModalBox.value = false;
      },
      actionMessageBox(event) {
        _actionMessageBox.value = event;
      },

      async requestAccess() {
        try {
          const res = await AuthService.getValidateCurrent(router.currentRoute.value);
          if (res.statusCode == 200) {
            _listSideMenu.value = res.value.data;
            isLoggedIn.value = true;

            if (router.currentRoute.value.name?.includes('home') || router.currentRoute.value.path === ('/')) {
              router.goTo("dashboard");
            }
          }
          if (res.statusCode == 302) {
            methods.clearMessageBox();
            methods.clearModalBox();
            methods.showModalBox(
              "Oops...",
              res.value?.message ? res.value?.message : "Usuário não autenticado. Realize novamente o login",
              "Descricao",
              "fa-solid fa-warning",
              null
            );
            router.goTo("dashboard");
          }
          else if (res.statusCode == 401) {
            methods.clearMessageBox();
            methods.clearModalBox();
            isLoggedIn.value = false;
            localStorage.clear();
            methods.showModalBox(
              "Oops...",
              "Usuário não autenticado. Realize novamente o login",
              "Descricao",
              "fa-solid fa-warning",
              null
            );
            router.goTo("home");
          }
        } catch (ex) {
          if (ex?.response?.status == 100 || ex?.response?.status == 401) {
            methods.clearMessageBox();
            methods.clearModalBox();
            isLoggedIn.value = false;
            localStorage.clear();
            methods.showModalBox(
              "Oops...",
              "Usuário não autenticado. Realize novamente o login",
              "Descricao",
              "fa-solid fa-warning",
              null
            );
            router.goTo("home");
          }
        }
      },

    });

    onMounted(async () => {
      await methods.requestAccess();
    });

    watch(router.currentRoute, (oldValue, newValue) => {
      if (oldValue != newValue) {
        try {
          showMainBar.value = false;
          showSideMenu.value = false;

          methods.requestAccess();
        } catch (err) {
          throw err;
        }
      }
    });

    provide("clearModalBox", methods.clearModalBox);
    provide("clearMessageBox", methods.clearMessageBox);
    provide("addMessageBox", methods.addMessageBox);
    provide("actionMessageBox", _actionMessageBox.value);
    provide("listMessageBox", _listMessageBox.value);
    provide("showModalBox", methods.showModalBox);
    provide("showSideMenu", showSideMenu);
    provide("showMainBar", showMainBar);
    provide("isLoggedIn", isLoggedIn);
    provide("isDarkMode", isDarkMode);
    return {
      router,
      isDarkMode,
      isLoggedIn,
      showMainBar,
      showSideMenu,
      _listSideMenu,
      _dataModalBox,
      _showModalBox,
      _listMessageBox,
      ...toRefs(methods),
    };
  },
};
</script>
<style>
@import url("https://kit.fontawesome.com/6ae4d69823.js");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
@import "./styles/commom.css";
@import "./styles/sidebar.css";

html, body{
  overflow-x: hidden;
}
.menu {
  position: fixed;
  z-index: 10;
}

.side-menu {
  position: absolute;
  z-index: 9;
}

.toggle-side-menu {
  position: fixed;
  z-index: 1
}
.main-bar {
  position: fixed;
  z-index: 9;
}

.router-view {
  position: absolute;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: var(--switch-mode-primary);
}
</style>
