<template>
  <main>
    <Menu v-if="isLoggedIn" class="menu"></Menu>
    <div v-if="isLoggedIn" class="toggle-side-menu" :class="showSideMenu ? 'open' : ''">
      <ToggleSideMenu v-if="isLoggedIn" />
      <SideMenu v-if="isLoggedIn" :listMenu="_listSideMenu" class="side-menu" />
    </div>
    <div class="relative-container">
      <div class="router-view" :class="isLoggedIn ? 'p-t-100' : 'p-0'">
        <router-view>
        </router-view>
      </div>
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
import ModalBox from "./views/components/modalBox.vue";
import MessageBox from "./views/components/MessageBox.vue";
import Menu from "./views/components/menu/menu.vue";
import ToggleSideMenu from "./views/components/SideMenu/components/ToggleSideMenu.vue";
import SideMenu from "./views/components/SideMenu/SideMenu.vue";
import AuthService from "./services/AuthService";
import { useRouter } from "vue-router";

export default {
  name: "App",
  components: { Menu, ModalBox, MessageBox, SideMenu, ToggleSideMenu },
  setup() {
    const isLoggedIn = ref(false);
    const _showModalBox = ref(false);
    const isDarkMode = ref(false);
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
      handleDarkMode() {
        if (isDarkMode.value) {
          document.documentElement.classList.add('dark-mode');
        } else {
          document.documentElement.classList.add('white-mode');
        }
      },

      async requestAccess() {
        try {
          const res = await AuthService.getValidateCurrent(router.currentRoute.value.path);
          console.log("res")
          console.log(res)
          if (res.statusCode == 200 || res.isCompletedSuccessfully) {
            _listSideMenu.value = res.result;
            isLoggedIn.value = true;
            console.log("req")
            if (router.currentRoute.value.name?.includes('home') || router.currentRoute.value.path === ('/')) {
              router.goTo("dashboard");
            }
          }
          if (res.statusCode == 401 || (res.statusCode == 100 && !router.currentRoute.value.name?.includes('home'))) {
            methods.clearMessageBox();
            methods.clearModalBox();
            isLoggedIn.value = false;
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
          console.log("ex")
          console.log(ex)
          if (ex.response.status == 100 || ex.response.status == 401) {
            methods.clearMessageBox();
            methods.clearModalBox();
            isLoggedIn.value = false;
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
      methods.handleDarkMode();
    });

    watch(router.currentRoute, async (oldValue, newValue) => {
      if (oldValue != newValue) {
        try {
          showMainBar.value = false;
          showSideMenu.value = false;
          await methods.requestAccess();
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
    provide("isDarkMode", isDarkMode.value);
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
  z-index: 10;
}

.main-bar {
  position: fixed;
  z-index: 9;
}

.router-view {
  position: absolute;
  width: 100%;
  overflow-x: hidden;
  background-color: var(--white-mode-primary);
}
</style>
