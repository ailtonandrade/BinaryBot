<template>
  <div :class="{ 'main-bar': true, 'show': showHide }">
    <div class="d-flex justify-end">
      <div class="col-md-3 p-0 m-0 col-lg-3 col-6 order-md-2 order-2">
        <div class="d-flex direction-column align-end main-bar-content b-shadow-3">
          <!-- Switch Mode -->
          <div class="main-bar-btn dark-mode col-4" @click="toggleDarkMode()">
            <button class="main-bar-btn-icon col-12 d-flex justify-center p-1">
              <font-awesome-icon class="dark-mode-sun p-r-10" :class="{ 'light-mode-active': !isDarkMode }"
                icon="fa-solid fa-sun" size="1x" />
              <font-awesome-icon class="dark-mode-moon" :class="{ 'dark-mode-active': isDarkMode }"
                icon="fa-solid fa-moon" size="1x" />
            </button>
          </div>
          <!-- Edit -->
          <div class="main-bar-btn" @click="editPerfil()">
            <span class=" main-bar-text">Editar perfil</span>
            <button class=" main-bar-btn-icon">
              <font-awesome-icon class="" icon="fa-solid fa-edit" size="1x" />
            </button>
          </div>
          <!-- Logout -->
          <div class="main-bar-btn" @click="logout()">
            <span class="main-bar-text">Sair</span>
            <button class=" main-bar-btn-icon">
              <font-awesome-icon class="" icon="fa-solid fa-sign-out" size="1x" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, toRefs, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ['showHide'],
  setup(props) {
    const router = useRouter();
    const isLoggedIn = inject("isLoggedIn");
    const isDarkMode = inject("isDarkMode");
    const clearModalBox = inject("clearModalBox");
    const clearMessageBox = inject("clearMessageBox");
    const methods = reactive({
      logout() {
        localStorage.clear();
        clearModalBox();
        clearMessageBox();
        isLoggedIn.value = false;
        router.goTo("home");
      },
      editPerfil() {
        router.push("/edit-user-perfil/" + localStorage.getItem("userName"))
      },
      toggleDarkMode() {
        isDarkMode.value = !isDarkMode.value
      }
    });

    return {
      router,
      isDarkMode,
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
</style>