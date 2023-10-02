<template>
  <div class="menu p-10">
    <div class="container-fluid">
      <div class="flex-row">
        <div class="brand-nav justify-start col-6" @click="redirectToHome()">
          <a class="p-1" href="#">BinaryBot</a>
        </div>
        <div class="col-6 flex-row justify-content-end">
          <div class="btn-nav">
            <button class="p-1" @click="toggleMenu()">
              <font-awesome-icon
                :icon="!showMenu ? 'fa-solid fa-bars' : 'fa-solid fa-times'"
                size="1x"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <mainBar :showHide="showMenu"></mainBar>
</template>
<script>
import { inject, toRefs, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import MainBar from "./MainBar.vue";


export default {
  components:{
    MainBar
  },
  setup() {
    const router = useRouter();
    const showMenu = ref(false);
    const methods = reactive({
      redirectToHome() {
        router.goTo("dashboard");
      },
      toggleMenu(){
        showMenu.value = !showMenu.value;
      },
    });

    return {
      router,
      showMenu,
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
  z-index: 1;
}
.brand-nav {
  display: flex;
  align-items: center;
}
.brand-nav a {
  color: white;
  border-radius: 10px;
  transition: 0.2s;
}
.brand-nav a:hover {
  background-color: rgb(78, 78, 78);
}
.btn-nav button{
  outline: none;
  border-radius: 10px;
  border-style: none;
  background-color: transparent;
  transition: 0.2s;
  color: white;
  cursor: pointer;
}
.btn-nav button:hover {
  background-color: rgb(78, 78, 78);
}
.btn-nav:active {
outline: none;
}

</style>