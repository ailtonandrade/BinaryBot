import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/login/Login.vue";
import Forgot from "./views/login/Forgot.vue";
import Redefine from "./views/login/Redefine.vue";
import Dashboard from "./views/dashboard/Dashboard.vue";
import Register from "./views/Register/Register.vue";
import ValidateCodeVue from "./views/Register/ValidateCode.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/dashboard",
      component: Dashboard,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/validate",
      component: ValidateCodeVue,
    },
    {
      path: "/forgot-pass",
      component: Forgot,
    },
    {
      path: "/redefine-pass",
      component: Redefine,
    },
  ],
});
