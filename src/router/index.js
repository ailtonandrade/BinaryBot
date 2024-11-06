import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login/Login.vue";
import Forgot from "@/views/login/Forgot.vue";
import Redefine from "@/views/login/Redefine.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import NotFound from "@/views/NotFound/NotFound.vue";
import Register from "@/views/Register/Register.vue";
import ValidateCodeVue from "@/views/Register/ValidateCode.vue";
import EditVue from "@/views/Users/Edit.vue";
import ListUsers from "@/views/Users/ListUsers.vue";
import EditPagesVue from "@/views/Pages/EditPages.vue";
import ListPermissionsVue from "@/views/Permissions/ListPermissions.vue";
import ListPerfilsVue from "@/views/Perfils/ListPerfils.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: Login,
    },
    {
      name: "dashboard",
      path: "/dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/management/users/create-user",
      name: "CreateUser",
      component: Register,
      meta: { requiresAuth: true },
    },
    {
      name: "validate",
      path: "/validate",
      component: ValidateCodeVue,
    },
    {
      name: "forgot-pass",
      path: "/forgot-pass",
      component: Forgot,
    },
    {
      name: "redefine",
      path: "/redefine",
      component: Redefine,
    },
    {
      name: "list-users",
      path: "/management/users/list-users",
      component: ListUsers,
      meta: { requiresAuth: true },
    },
    {
      name: "edit-perfil",
      path: "/management/pages/edit-perfil",
      component: ListPerfilsVue,
      meta: { requiresAuth: true },
    },
    {
      name: "edit-user-perfil",
      path: "/edit-user-perfil/:id",
      component: EditVue,
      meta: { requiresAuth: true },
    },
    {
      name: "edit-user-perfil",
      path: "/edit-user-perfil/:userName",
      component: EditVue,
      meta: { requiresAuth: true },
    },
    {
      name: "edit-permissions",
      path: "/management/pages/edit-permissions",
      component: ListPermissionsVue,
      meta: { requiresAuth: true },
    },
    {
      name: "edit-pages",
      path: "/management/pages/edit-pages",
      component: EditPagesVue,
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    }
  ],


});

// Função de navegação personalizada com objeto no query param
router.goToPath = (routerPath) => {
  router.push({ path: "/"+routerPath });
};

router.goTo = (routeName, objectData) => {
  
  if (Array.isArray(objectData)) {
    router.push({ name: routeName, params: { obj: JSON.stringify(objectData) } });
  }
  else if (typeof objectData === 'object') {
    router.push({ name: routeName, params: { obj: JSON.stringify(objectData) } });
  } else {
    router.push({ name: routeName, params: { obj: JSON.stringify(objectData) } });
  }
};


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