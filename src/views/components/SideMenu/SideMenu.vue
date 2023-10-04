<template>
  <div>
    <div v-for="(menu, index) in _listMenu" :key="index">
      <div class="btn-side-menu">
        <button @click="goToRoute(menu.name)">
          <font-awesome-icon class="toggle-side-menu-icon" :icon="menu.icon ? 'fa-solid fa-' + menu.icon : ''"
            size="1x" />
          <span>{{ menu.displayName }}</span>
        </button>
      </div>
      <div v-for="(subMenu, indexSub) in menu.subMenu" :key="indexSub">
        <div class="btn-side-submenu">
          <button @click="goToRoute(menu.name, subMenu.name)">
            <font-awesome-icon class="toggle-side-menu-icon" :icon="subMenu.icon ? 'fa-solid fa-' + subMenu.icon : ''"
              size="1x" />
            <span>{{ subMenu.displayName }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, toRefs, reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";


export default {
  props: ['listMenu'],
  components: {
  },
  setup(props) {
    const router = useRouter();
    const _listMenu = ref();
    const methods = reactive({
      goToRoute(menu, subMenu = null) {
        var route = subMenu ? menu + '/' + subMenu : menu;
        console.log(route);
        router.push(route);
      }
    });

    onMounted(() => {
      _listMenu.value = props.listMenu;
    })
    return {
      router,
      _listMenu,
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
@import "../../../styles/commom.css";

.toggle-side-menu-icon,
.btn-side-menu span,
.btn-side-submenu span {
  color: var(--white-mode-primary);
}
</style>