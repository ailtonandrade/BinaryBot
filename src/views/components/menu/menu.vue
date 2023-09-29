<template>
  <div class="menu">
    <div class="container-fluid">
      <div class="flex-row">
        <div class="brand-nav col-6" @click="redirectToHome()">
          <a class="" href="#">BinaryBot</a>
        </div>
        <div class="col-6">
          <div class="btn-nav">
            <button class="" @click="logout()">
              <font-awesome-icon
                icon="fa-solid fa-right-from-bracket"
                size="2x"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, toRefs, reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const clearModalBox = inject("clearModalBox");
    const clearMessageBox = inject("clearMessageBox");
    const methods = reactive({
      redirectToHome() {
        router.goTo("dashboard");
      },
      logout() {
        localStorage.clear();
        clearModalBox();
        clearMessageBox();
        router.goTo("home");
      },
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

.menu {
  background-color: #292929;
}
.menu a {
  color: white;
}
.menu button {
  border-radius: 10px;
  padding: 5px;
  border-style: none;
  background-color: transparent;
  transition: 0.2s;
  color: white;
}
.menu button:hover {
  cursor: pointer;
  border-style: none;
  background-color: rgb(78, 78, 78);
  color: white;
}
.brand-nav {
  display: flex;
  align-items: center;
}
.brand-nav:hover {
  display: flex;
  border-style: none;
  align-items: center;
}
.brand-nav a {
  border-radius: 10px;
  padding: 5px;
}
.brand-nav a:hover {
  background-color: rgb(78, 78, 78);
  transition: 0.2s;
}
</style>