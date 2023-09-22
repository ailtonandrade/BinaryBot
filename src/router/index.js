import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/Login.vue";
import Forgot from "../views/login/Forgot.vue";
import Redefine from "../views/login/Redefine.vue";
import Dashboard from "../views/login/dashboard/Dashboard.vue";
import Register from "../views/Register/Register.vue";
import ValidateCodeVue from "../views/Register/ValidateCode.vue";
import EditVue from "../views/login/dashboard/Edit.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
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
    {
      path: "/edit",
      component: EditVue,
      meta: { requiresAuth: true },
    },
  ],

  
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Se a rota requer autenticação
    const token = localStorage.getItem('token'); // Recupere o token do localStorage
   
    if (!token) {
      
      // Se não houver token, redirecione para a página de login
      next('/');
    } else {
      // Caso contrário, continue para a rota desejada
      next();
    }
  } else {
   
    // Se a rota não requer autenticação, continue para a rota desejada
    next();
  }
});

export default router;