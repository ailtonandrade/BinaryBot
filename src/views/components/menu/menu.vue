<template>
  <div class="menu p-10">
    <div class="d-flex flex-row">
      <div id="back" class="col-1 brand-nav justify-start btn-nav" @click="redirectToHome()">
        <button v-if="router.currentRoute.value.name != 'dashboard'" class="p-1" @click="back()">
          <font-awesome-icon icon="fa-solid fa-arrow-left" size="1x" />
        </button>
      </div>
      <div id="brand"
        class="col-lg-8 col-md-8 d-sm-hidden brand-nav justify-content-lg-start justify-content-md-start justify-center">
        <a class="p-1" @click="redirectToHome()" href="#">BinaryBot</a>
      </div>
      <div id="options" class="col-lg-3 col-md-3 col-sm-11 d-flex flex-row justify-content-end align-center">
        <div id="notify" class="btn-nav nav-notify" :class="{ 'active': showNotifyBar }" @click="toggleNotify()">
          <button class="p-1">
            <font-awesome-icon class="btn-nav-icon" :class="{ 'active': showNotifyBar }"
              :icon="!showNotifyBar ? 'fa-regular fa-bell' : 'fa-regular fa-bell'" size="1x" />
          </button>
          <div v-if="newNotifyQtd && newNotifyQtd > 0" class="new-notify">{{ newNotifyQtd > 9 ? '9+' : newNotifyQtd }}
          </div>
        </div>
        <div id="user-data" class="d-flex info-user align-center">
          <img v-if="userData?.imgUser" id="img-user" class="px-2 b-radius-100" style="width:45px;"
            :src="handleImgUser()" />
          <span id="name-user">@{{ userData?.userName }}</span>
        </div>
        <div id="options-menu" class="btn-nav px-1" :class="{ 'active': showMainBar }" @click="toggleMenu()">
          <button>
            <font-awesome-icon class="btn-nav-icon" :class="{ 'active': showMainBar }"
              :icon="!showMainBar ? 'fa-solid fa-bars' : 'fa-solid fa-times'" size="1x" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <notifyBar @notify-data-list="updateNotifyView($event)" :showHide="showNotifyBar"></notifyBar>
  <mainBar :showHide="showMainBar"></mainBar>
</template>
<script>

import { inject, toRefs, reactive, ref, provide, onMounted } from "vue";
import { useRouter } from "vue-router";
import MainBar from "./MainBar.vue";
import NotifyBar from "./NotifyBar.vue";
import ObjectUtils from "../../../Utils/ObjectUtils";

export default {
  components: {
    NotifyBar,
    MainBar,
  },
  setup() {
    const router = useRouter();
    const userData = ref({
      userName: "",
      imgUser: "img/img-user-blank.png"
    });
    const showMainBar = inject("showMainBar", false);
    const showNotifyBar = inject("showNotifyBar", false);
    const newNotifyQtd = ref(0);
    const notifyDataList = ref([]);
    const methods = reactive({
      redirectToHome() {
        showMainBar.value = false;
        showNotifyBar.value = false;
        router.goTo("dashboard");
      },
      toggleNotify() {
        showNotifyBar.value = !showNotifyBar.value;
      },
      updateNotifyView(data) {
        notifyDataList.value = data;
        newNotifyQtd.value = notifyDataList?.value?.map(n => n.visualized === false).length;
      },
      toggleMenu() {
        showMainBar.value = !showMainBar.value;
      },
      back() {
        router.back();
      },
      handleUserInfos() {
        userData.value.userName = localStorage.getItem("userName");
        userData.value.imgUser = localStorage.getItem("imgUser");
      },
      handleImgUser() {
        try {
          return "data:image/jpeg;base64," + userData.value.imgUser;
        } catch (ex) {
          return require("@/assets/" + userData.value.imgUser);
        }
      }
    });

    provide('newNotifyQtd', newNotifyQtd);
    onMounted(() => {
      methods.handleUserInfos();
    });
    return {
      userData,
      router,
      showMainBar,
      newNotifyQtd,
      showNotifyBar,
      notifyDataList,
      ...toRefs(methods),
    };
  },

};
</script>
<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
@import "../../../styles/commom.css";

.menu {
  width: 100%;
  background-color: var(--switch-mode-tertiary);
  box-shadow: 1px 1px 0.5px 0.2px rgb(0, 0, 0, 0.3);
}

.brand-nav {
  display: flex;
  align-items: center;
}

.brand-nav a {
  color: var(--switch-elements-mode-secondary);
  background-color: var(--switch-mode-secondary);
  border-radius: 10px;
  transition: 0.2s;
}

.brand-nav a:hover {
  text-decoration: none;
  color: var(--switch-elements-mode-primary);
  background-color: var(--switch-mode-primary);
}

.info-user {
  font-weight: 600;
  color: var(--switch-elements-mode-primary);
}

.btn-nav.active button {
  color: var(--switch-mode-secondary);
  background-color: var(--switch-elements-mode-tertiary);
  border-radius: 10px;
  transition: 0.2s;
}
</style>