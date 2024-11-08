<template>
  <div>
    <div class="card-box">
      <div class="m-2 p-2">
        <!-- Switch Mode -->
        <div class="col-12 mx-0 px-0 d-flex justify-content-end">
          <div class="col-1" @click="toggleDarkMode()">
            <button class="user-select-none main-bar-btn-icon col-12 d-flex justify-center p-1">
              <font-awesome-icon class="dark-mode-sun p-r-10" :class="{ 'light-mode-active': !isDarkMode }"
                icon="fa-solid fa-sun" size="1x" />
              <font-awesome-icon class="dark-mode-moon" :class="{ 'dark-mode-active': isDarkMode }"
                icon="fa-solid fa-moon" size="1x" />
            </button>
          </div>
        </div>
        <div class="container-fluid d-flex flex-column align-center justify-center">
          <h1 style="font-weight: 900;">{{ title }}</h1>
          <h5>{{ description }}</h5>
          <LineDecoration></LineDecoration>
        </div>
        <div class="card-box-content container-fluid d-flex align-center justify-center">
          <slot></slot>
        </div>
      </div>
      <div class="text-center small" style="opacity: 0.8;">
        <span>powered by</span>
        <p>
          <b>Atend.io</b>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, watch, reactive, toRefs, ref, inject, onMounted } from "vue";
import LineDecoration from "./LineDecoration.vue";
import { useRouter } from "vue-router";

export default ({
  props: ['title', 'description', 'breadcrumb'],
  components: {
    LineDecoration
  },
  name: "CardBoxBook",
  setup(props) {
    const router = useRouter();
    const isDarkMode = inject("isDarkMode");
    const methods = reactive({
      goToRoute(route) {
        if (route)
          router.goTo(route);
      },
      toggleDarkMode() {
        isDarkMode.value = !isDarkMode.value
      },
    });


    return {
      router,
      isDarkMode,
      ...toRefs(methods),
    };
  },
});
</script>
<style scoped>
.card-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  max-width:1300px;
  background-color: var(--switch-mode-primary);
}

@media (min-width: 600px) {
  .card-box {
    overflow: hidden;
  }
}

.card-box-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0px;
  border-radius: 20px;
  box-shadow: 1px 1px 1px 1px rgb(0, 0, 0, 0.2);
  background-color: var(--switch-mode-secondary);
  overflow: hidden;
}

.breadcrumb-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.breadcrumb-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  margin: 0px 10px;
  padding: 0 10px;
  height: 20px;
  color: var(--switch-mode-elements-tertiary);
  border-radius: 5px;
  cursor: pointer;
  font-size: small;
  background-color: var(--switch-mode-tertiary);
  box-shadow: 1px 1px 1px 0.1px rgb(0, 0, 0, 0.2);
}

.breadcrumb-dot {
  pointer-events: none;
  color: var(--switch-mode-elements-tertiary);
}

h1 {
  color: var(--switch-mode-elements-primary);
}

p {
  color: var(--switch-mode-elements-primary);
}
</style>
