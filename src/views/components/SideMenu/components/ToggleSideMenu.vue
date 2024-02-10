<template>
  <div>
    <button class="toggle-side-menu-btn b-radius-10 b-shadow-2" :class="showSideMenu ? 'open':''" @click="toggleSideMenu()">
      <font-awesome-icon class="toggle-side-icon" icon="fa-solid fa-arrow-right" size="1x" />
    </button>
  </div>
</template>
<script>
import { inject, toRefs, reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";


export default {
  components: {
  },
  setup(props) {
    const router = useRouter();
    const showSideMenu = inject("showSideMenu");
    const methods = reactive({
      toggleSideMenu() {
        showSideMenu.value = !showSideMenu.value;
      }
    });

    onMounted(() => {

    })
    return {
      router,
      showSideMenu,
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
@import "../../../../styles/commom.css";


.toggle-side-menu-btn {
  position: fixed;
  cursor: pointer;
  outline: none;
  border-style: none;
  color: var(--switch-elements-mode-primary);
  background-color: var(--switch-mode-secondary);
  height: 40px;
  width: 40px;
  top: 5px;
  transition: 0.2;
}

.toggle-side-menu-btn:hover {
  background-color: var(--switch-mode-secondary);
  transition: 0.2;
}
</style>