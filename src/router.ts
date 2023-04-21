import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/login/Login.vue";
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
  ],
});
