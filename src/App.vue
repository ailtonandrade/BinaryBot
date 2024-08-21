<template>
  <main>
    <SwitchMode></SwitchMode>
    <div class="menu">
      <Menu v-if="isLoggedIn"></Menu>
    </div>
    <div v-if="isLoggedIn" class="toggle-side-menu" :class="showSideMenu ? 'open' : ''">
      <ToggleSideMenu v-if="isLoggedIn" />
      <SideMenu v-if="isLoggedIn" :listMenu="listSideMenu" class="side-menu" />
    </div>
    <div class="router-view" :class="isLoggedIn ? 'p-t-custom h-100' : 'p-0'">
      <router-view>
      </router-view>
    </div>
    <Loading></Loading>
    <div class="message-box">
      <MessageBox v-if="listMessageBox.length > 0" :listMessageBox="listMessageBox" @action="actionMessageBox($event)"
        @closeMessageBox="closeMessageBox()" />
    </div>
    <div class="modal-box-app">
      <ModalBox v-if="showModalBox" @closeModal="closeModalBox()" :title="dataModalBox.title" :icon="dataModalBox.icon"
        :message="dataModalBox.message" :description="dataModalBox.description" :action="dataModalBox.action" />
    </div>
    <ModalCustom v-if="configModalCustom.show" :show="configModalCustom.show" :reference="configModalCustom.reference"
      :title="configModalCustom.title" :icon="configModalCustom.icon" :message="configModalCustom.message"
      :action="configModalCustom.action" :description="configModalCustom.description"></ModalCustom>
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
  onCreated
} from "vue";
import ModalBox from "./views/components/ModalBox.vue";
import MessageBox from "./views/components/MessageBox.vue";
import SwitchMode from "./views/components/SwitchMode.vue";
import Menu from "./views/components/menu/Menu.vue";
import ToggleSideMenu from "./views/components/SideMenu/components/ToggleSideMenu.vue";
import SideMenu from "./views/components/SideMenu/SideMenu.vue";
import Loading from "./views/components/Loading.vue";
import AuthService from "./services/AuthService";
import { useRouter } from "vue-router";
import auxiliar from "./global/auxiliar";
import ModalCustom from './views/components/ModalCustom.vue';
import moment from 'moment';
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";

export default {
  name: "App",
  components: { Menu, ModalBox, ModalCustom, MessageBox, SideMenu, ToggleSideMenu, SwitchMode, Loading },
  setup() {
    const isLoggedIn = ref(false);
    const showModalBox = ref(false);
    const isDarkMode = ref(true);
    const showMainBar = ref(false);
    const showNotifyBar = ref(false);
    const router = useRouter();
    const imgUser = ref(localStorage.getItem("imgUser"));
    const configModalCustom = ref({
      show: false,
      reference: "",
      title: "",
      icon: "",
      message: "",
      action: "",
      description: "",
    });
    const dataModalBox = ref({
      title: "",
      message: "",
      action: "",
      description: "",
    });

    const listMessageBox = ref([]);
    const _actionMessageBox = ref();

    const listSideMenu = ref([]);
    const showSideMenu = ref(false);

    const methods = reactive({
      closeModalBox() {
        showModalBox.value = false;
      },
      openModalBox(obj) {
        dataModalBox.value.title = obj.title;
        dataModalBox.value.message = obj.message;
        dataModalBox.value.description = obj.description;
        dataModalBox.value.action = obj.action;
        dataModalBox.value.icon = obj.icon ?? "";
        showModalBox.value = true;
      },
      addMessageBox(title, message, btnText, modalBoxClass, funcEmit) {
        listMessageBox.value.push({
          title: title,
          message: message,
          btnText: btnText,
          modalBoxClass: modalBoxClass,
          funcEmit: funcEmit,
        });
        setTimeout(() => {
          listMessageBox.value.pop();
        }, 3000);
      },
      clearMessageBox() {
        listMessageBox.value = [];
      },
      clearModalBox() {
        showModalBox.value = false;
      },
      actionMessageBox(event) {
        _actionMessageBox.value = event;
      },
      openModalCustom(config) {
        let modal = document.getElementById('modal-custom-' + config.reference);
        modal.style.display = 'block';
      },
      closeModalCustom(config) {
        let modal = document.getElementById('modal-custom-' + config.reference);
        modal.style.display = 'none';
      },
      async requestAccess() {
        try {
          const res = await AuthService.getValidateCurrent(router.currentRoute.value);
          if (res.statusCode == 200) {
            listSideMenu.value = res.value.data;
            isLoggedIn.value = true;
            if (router.currentRoute?.value?.name?.includes('home') || router.currentRoute?.value?.path === ('/')) {
              router.goTo("dashboard");
            }
          }
          if (res.statusCode == 302) {
            methods.clearMessageBox();
            methods.clearModalBox();
            methods.openModalBox(
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
            methods.openModalBox(
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
            methods.openModalBox(
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
    });

    watch(router.currentRoute, (oldValue, newValue) => {
      if (oldValue != newValue) {
        try {
          showMainBar.value = false;
          showNotifyBar.value = false;
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
    provide("openModalCustom", methods.openModalCustom);
    provide("closeModalCustom", methods.closeModalCustom);
    provide("actionMessageBox", _actionMessageBox.value);
    provide("listMessageBox", listMessageBox.value);
    provide("openModalBox", methods.openModalBox);
    provide("showSideMenu", showSideMenu);
    provide("showMainBar", showMainBar);
    provide("showNotifyBar", showNotifyBar);
    provide("showModalBox", showModalBox);
    provide("isLoggedIn", isLoggedIn);
    provide("isDarkMode", isDarkMode);
    provide("imgUser", imgUser);
    provide("moment", moment);
    return {
      router,
      imgUser,
      isDarkMode,
      isLoggedIn,
      showMainBar,
      showNotifyBar,
      showSideMenu,
      listSideMenu,
      dataModalBox,
      showModalBox,
      listMessageBox,
      configModalCustom,
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
@import "./styles/boardLayout.css";

html,
body {
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

.notify-bar {
  position: fixed;
  z-index: 9;
}

.main-bar {
  position: fixed;
  z-index: 9;
}

.router-view {
  position: absolute;
  width: 100%;
  overflow-x: hidden;
  background-color: var(--switch-mode-primary);
}
</style>
