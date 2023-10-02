<template>
  <main>
    <Menu class="menu" v-if="isLoggedIn" />
    <div class="relative-container">
      <div class="router-view">
        <router-view></router-view>
      </div>
      <MessageBox class="message-box" v-if="_listMessageBox.length > 0" :listMessageBox="_listMessageBox"
        @action="actionMessageBox($event)" @closeMessageBox="closeMessageBox()" />
    </div>
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
import AuthService from "./services/AuthService";
import { useRouter } from "vue-router";

export default {
  name: "App",
  components: { Menu, ModalBox, MessageBox },
  setup() {
    const isLoggedIn = ref(false);
    const _showModalBox = ref(false);
    const isDarkMode = ref(false);
    const router = useRouter();
    const _dataModalBox = ref({
      title: "",
      message: "",
      action: "",
      description: "",
    });

    const _listMessageBox = ref([]);
    const _actionMessageBox = ref();

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
        const res = await AuthService.getValidateCurrent();
        if (res.statusCode == 100 || res.statusCode == 401) {
          isLoggedIn.value = false;
        } else if (res.statusCode == 200) {
          isLoggedIn.value = true;
          if (router.currentRoute.value.name.includes('home')) {
            router.goTo("dashboard");
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

    provide("isDarkMode", isDarkMode.value);
    return {
      router,
      isDarkMode,
      isLoggedIn,
      _dataModalBox,
      _showModalBox,
      _listMessageBox,
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
@import url("https://kit.fontawesome.com/6ae4d69823.js");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
@import "./styles/commom.css";


.relative-container {
  position: relative;
}

.router-view {
  position: absolute;
  padding-top: 50px;
  transform: translateY(-100px);
  width: 100%;
  z-index: -3;
  background-color: var(--white-mode-primary);
}

.message-box {
  position: absolute;
  z-index: 2;
}
</style>
