<template>
  <div class="menu p-10">
    <div class="container-fluid">
      <div class="flex-row">
        <div class="brand-nav justify-start col-4 btn-nav" @click="redirectToHome()">
          <button v-if="router.currentRoute.value.name != 'dashboard'" class="p-1" @click="back()">
            <font-awesome-icon icon="fa-solid fa-arrow-left" size="1x" />
          </button>
        </div>
        <div class="brand-nav justify-center col-4" @click="redirectToHome()">
          <a class="p-1" href="#">BinaryBot</a>
        </div>
        <div class="col-4 flex-row justify-content-end">
          <div class="btn-nav" @click="toggleMenu()">
            <button class="p-1">
              <font-awesome-icon class="btn-nav-icon" :class="{ 'active': showMainBar }"
                :icon="!showMainBar ? 'fa-solid fa-bars' : 'fa-solid fa-times'" size="1x" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <mainBar :showHide="showMainBar"></mainBar>
</template>
<script>
import { inject, toRefs, reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import MainBar from "./MainBar.vue";


export default {
  components: {
    MainBar
  },
  setup() {
    const router = useRouter();
    const showMainBar = inject("showMainBar", false);
    const methods = reactive({
      redirectToHome() {
        showMainBar.value = false;
        router.goTo("dashboard");
      },
      toggleMenu() {
        showMainBar.value = !showMainBar.value;
      },
      back() {
        router.back();
      }
    });


    return {
      router,
      showMainBar,
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
  background-color: var(--switch-mode-secondary);
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
</style>