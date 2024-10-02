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

.main-bar {
  opacity: 0;
  width: 100%;
  transform: translateY(-500px);
  transition: transform 0.7s ease, opacity 0.2s ease;
}

.main-bar.show {
  opacity: 1;
  transform: translateY(50px);
  transition: transform 0.7s ease, opacity 0.2s ease;
}

.main-bar-content {
  position: fixed;
  right: 0%;
  width: 200px;
  background-color: var(--switch-mode-secondary);
  padding: 10px;
  border-bottom-left-radius: 10px;
  margin-bottom: 15px;
  box-shadow: -1px 1px 0.1px 0.1px rgba(0, 0, 0, 0.2);

}

.main-bar-btn {
  display: flex;
  width: 100%;
  background-color: transparent;
  justify-content: flex-end;
  align-items: center;
  transition: 0.3s;
  background-color: var(--switch-mode-secondary);
  color: var(--switch-mode-elements-primary);
  cursor: pointer;
}

.main-bar-btn:hover {
  transition: 0.3s ease;
  border-radius: 5px;
  background-color: var(--switch-mode-tertiary);
  color: var(--decoration-primary)
}

.main-bar-text {
  font-size: medium;
  padding-right: 10px;
}

.main-bar-btn-icon {
  border-radius: 5px;
  outline: none;
  border: none;
  transition: 0.3s;
  color: var(--switch-mode-elements-primary);
  background-color: transparent;
  cursor: pointer;
}

.main-bar-btn:hover .main-bar-btn-icon {
  color: var(--decoration-primary)
}

.dark-mode {
  border-radius: 5px;
  overflow: hidden;
  background-color: var(--switch-mode-primary);
  margin-bottom: 50px;
}

.dark-mode-sun {
  color: var(--switch-mode-elements-secondary);
  transform: translateY(-10px);
  transition: 1s ease-in-out;
  opacity: 0.5;
}

.dark-mode-sun.light-mode-active {
  color: var(--decoration-primary);
  transform: translateY(0);
  transition: 1s ease-in-out;
  opacity: 1;
}

.dark-mode-moon {
  color: var(--switch-mode-elements-secondary);
  transform: translateY(-10px);
  transition: 1s ease-in-out;
  opacity: 0.5;
}

.dark-mode-moon.dark-mode-active {
  color: var(--decoration-primary);
  transform: translateY(0);
  transition: 1s ease-in-out;
  opacity: 1;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(180deg);
  }
}
</style>