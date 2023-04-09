import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/login/Login.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Login,
    },
  ],
});
