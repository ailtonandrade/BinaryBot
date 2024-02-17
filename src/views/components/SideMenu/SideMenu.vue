<template>
  <div v-if="showSideMenu">
    <!-- menu expanded -->
    <div v-for="(menu, index) in listMenu" :key="index">
      <div class="btn-side-menu collapse-animation expand-animation" :class="{ 'drop': menu.isDropped }">
        <ul class="d-flex p-2 m-3" :id="menu.name" @click="action(menu, menu.subMenu, menu.name)">
          <button class="d-flex justify-center align-center">
            <font-awesome-icon class="toggle-side-icon" :icon="menu.icon ? 'fa-solid fa-' + menu.icon : ''" size="1x" />
            <span class="p-l-10">{{ menu.displayName }}</span>
          </button>
          <button class="w-10 d-flex justify-end align-center">
            <font-awesome-icon class="toggle-side-menu-icon col-3" icon="fa-solid fa-chevron-down" />
          </button>
        </ul>
        <div v-for="(subMenu, indexSub) in menu.subMenu" :key="indexSub">
          <div class="btn-side-submenu p-l-10 p-r-10 m-3 collapse-animation expand-animation"
            :class="{ 'drop': subMenu.isDropped }">
            <li class="d-flex" :id="menu.name + subMenu.name"
              @click="action(subMenu, subMenu.pages, menu.name + '/' + subMenu.name)">
              <button class="d-flex align-center col-10">
                <font-awesome-icon class="d-flex justify-start toggle-side-icon col-1"
                  :icon="subMenu.icon ? 'fa-solid fa-' + subMenu.icon : ''" size="1x" />
                <span class="">{{ subMenu.displayName }}</span>
              </button>
              <button class="d-flex justify-end align-center">
                <font-awesome-icon class="toggle-side-submenu-icon col-4" icon="fa-solid fa-chevron-down" />
              </button>
            </li>
            <div>
              <div v-for="(page, indexPage) in subMenu.pages" :key="indexPage">
                <span class="btn-side-page collapse-animation expand-animation">
                  <div class="" :id="menu.name + subMenu.name + page.name">
                    <button class="d-flex justify-start align-center p-l-10 col-12"
                      @click="action(page, null, menu.name + '/' + subMenu.name + '/' + page.name)">
                      <font-awesome-icon style="overflow-x: hidden;" class="toggle-side-page-icon col-1"
                        :icon="page.icon ? 'fa-solid fa-' + page.icon : ''" />
                      <span>{{ page.displayName }}</span>
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <!-- menu collapsed -->
    <div v-for="(menu, index) in listMenu" :key="index">
      <div class="btn-side-menu collapse-animation expand-animation" :class="{ 'drop': menu.isDropped }">
        <ul class="d-flex p-2 m-3 justify-center" :id="menu.name" @click="action(menu, menu.subMenu, menu.name)">
          <button class="d-flex large">
            <font-awesome-icon class="toggle-side-icon" :icon="menu.icon ? 'fa-solid fa-' + menu.icon : ''" size="1x" />
          </button>
        </ul>
        <div v-for="(subMenu, indexSub) in menu.subMenu" :key="indexSub">
          <div class="btn-side-submenu p-l-10 p-r-10 m-3 collapse-animation expand-animation"
            :class="{ 'drop': subMenu.isDropped }">
            <li class="d-flex justify-center" :id="menu.name + subMenu.name"
              @click="action(subMenu, subMenu.pages, menu.name + '/' + subMenu.name)">
              <button class="d-flex medium">
                <font-awesome-icon class="d-flex justify-start toggle-side-icon"
                  :icon="subMenu.icon ? 'fa-solid fa-' + subMenu.icon : ''" />
              </button>
            </li>
            <div>
              <div v-for="(page, indexPage) in subMenu.pages" :key="indexPage">
                <span class="btn-side-page p-t-10 collapse-animation expand-animation">
                  <div class="" :id="menu.name + subMenu.name + page.name">
                    <button class="d-flex justify-center align-center"
                      @click="action(page, page, menu.name + '/' + subMenu.name + '/' + page.name)">
                      <font-awesome-icon class="small toggle-side-page-icon"
                        :icon="page.icon ? 'fa-solid fa-' + page.icon : ''" />
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
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
    const showSideMenu = inject("showSideMenu");
    const listMenu = ref();
    const methods = reactive({
      action(element, child, route) {
        if (!Array.isArray(child)) {
          if (router.currentRoute.value.path !== ("/" + route)) {
            router.goToPath(route);
          }
        } else {
          element.isDropped = !element.isDropped;
        }
      },
    });

    onMounted(() => {
      listMenu.value = props.listMenu;
    })
    return {
      router,
      showSideMenu,
      listMenu,
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
</style>