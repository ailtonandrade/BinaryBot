<template>
  <div class="x-hidden">
    <div :class="{ 'main-bar': true, 'show': showHide }">
      <div class="container-fluid x-hidden">
        <div class="row">
          <div class="col-md-3 p-0 m-0 col-lg-3 col-6 order-md-2 order-2">
            <div class="d-flex direction-column align-start main-bar-content">
              <div class="main-bar-btn" @click="logout()">
                <span class="main-bar-text">Sair</span>
                <button class=" main-bar-btn-icon" >
                  <font-awesome-icon class="" icon="fa-solid fa-sign-out" size="1x" />
                </button>
              </div>
              <div class="main-bar-btn" @click="editPerfil()">
                <span class=" main-bar-text">Editar perfil</span>
                <button class=" main-bar-btn-icon">
                  <font-awesome-icon class="" icon="fa-solid fa-edit" size="1x" />
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-md-9 col-6 order-md-1 order-1">
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
        router.goTo("edit-perfil")
      }
    });

    return {
      router,
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
@import "../../../styles/commom.css";

.main-bar {
  opacity: 0;
  width: 100%;
  transform: translateY(-500%);
  transition: transform 0.7s ease, opacity 0.2s ease;
}

.main-bar.show {
  opacity: 1;
  transform: translateY(50px);
  transition: transform 0.7s ease, opacity 0.2s ease;
}

.main-bar-content {
  background-color: var(--white-mode-secondary);
  padding: 10px;
  border-bottom-left-radius: 20px;
  z-index: 1;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, 0.3);

}

.main-bar-btn-icon {
  border-radius: 5px;
  outline: none;
  border: none;
  background-color: transparent;
  color: var(--white-mode-primary);
  cursor: pointer;
}

.main-bar-btn {
  display: flex;
  width: 100%;
  padding-right: 20px;
  background-color: transparent;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--white-mode-secondary);
  transition: 0.6s ease;
  opacity: 0.7;
  cursor: pointer;
}

.main-bar-btn:hover {
  opacity: 1;
  transition: 0.4s ease;
}

.main-bar-text {
  padding-right: 20px;
  color: var(--white-mode-primary);
}
</style>