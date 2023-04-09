[33mcommit ae94eb0bea5b3a52e79ee3ade998f135481d7868[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m)[m
Author: Ailton Andrade Tom <ailtonandrade15@gmail.com>
Date:   Sun Apr 9 17:26:18 2023 +0000

    add routes

[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex 6fe7597..3ac91c4 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -9,7 +9,8 @@[m
       "version": "0.0.0",[m
       "dependencies": {[m
         "axios": "^1.3.5",[m
[31m-        "vue": "^3.2.45"[m
[32m+[m[32m        "vue": "^3.2.45",[m
[32m+[m[32m        "vue-router": "^4.1.6"[m
       },[m
       "devDependencies": {[m
         "@codesandbox/vue-preview": "^0.1.1-alpha.16",[m
[36m@@ -508,6 +509,11 @@[m
         "@vue/shared": "3.2.47"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@vue/devtools-api": {[m
[32m+[m[32m      "version": "6.5.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@vue/devtools-api/-/devtools-api-6.5.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-o9KfBeaBmCKl10usN4crU53fYtC1r7jJwdGKjPT24t348rHxgfpZ0xL3Xm/gLUYnc0oTp8LAmrxOeLyu6tbk2Q=="[m
[32m+[m[32m    },[m
     "node_modules/@vue/reactivity": {[m
       "version": "3.2.47",[m
       "resolved": "https://registry.npmjs.org/@vue/reactivity/-/reactivity-3.2.47.tgz",[m
[36m@@ -987,6 +993,20 @@[m
         "@vue/shared": "3.2.47"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/vue-router": {[m
[32m+[m[32m      "version": "4.1.6",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/vue-router/-/vue-router-4.1.6.tgz",[m
[32m+[m[32m      "integrity": "sha512-DYWYwsG6xNPmLq/FmZn8Ip+qrhFEzA14EI12MsMgVxvHFDYvlr4NXpVF5hrRH1wVcDP8fGi5F4rxuJSl8/r+EQ==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@vue/devtools-api": "^6.4.5"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/posva"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "vue": "^3.2.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/vue-template-compiler": {[m
       "version": "2.7.14",[m
       "resolved": "https://registry.npmjs.org/vue-template-compiler/-/vue-template-compiler-2.7.14.tgz",[m
[36m@@ -1311,6 +1331,11 @@[m
         "@vue/shared": "3.2.47"[m
       }[m
     },[m
[32m+[m[32m    "@vue/devtools-api": {[m
[32m+[m[32m      "version": "6.5.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@vue/devtools-api/-/devtools-api-6.5.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-o9KfBeaBmCKl10usN4crU53fYtC1r7jJwdGKjPT24t348rHxgfpZ0xL3Xm/gLUYnc0oTp8LAmrxOeLyu6tbk2Q=="[m
[32m+[m[32m    },[m
     "@vue/reactivity": {[m
       "version": "3.2.47",[m
       "resolved": "https://registry.npmjs.org/@vue/reactivity/-/reactivity-3.2.47.tgz",[m
[36m@@ -1644,6 +1669,14 @@[m
         "@vue/shared": "3.2.47"[m
       }[m
     },[m
[32m+[m[32m    "vue-router": {[m
[32m+[m[32m      "version": "4.1.6",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/vue-router/-/vue-router-4.1.6.tgz",[m
[32m+[m[32m      "integrity": "sha512-DYWYwsG6xNPmLq/FmZn8Ip+qrhFEzA14EI12MsMgVxvHFDYvlr4NXpVF5hrRH1wVcDP8fGi5F4rxuJSl8/r+EQ==",[m
[32m+[m[32m      "requires": {[m
[32m+[m[32m        "@vue/devtools-api": "^6.4.5"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "vue-template-compiler": {[m
       "version": "2.7.14",[m
       "resolved": "https://registry.npmjs.org/vue-template-compiler/-/vue-template-compiler-2.7.14.tgz",[m
[1mdiff --git a/package.json b/package.json[m
[1mindex 14b7d09..e0b5673 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -10,7 +10,8 @@[m
   },[m
   "dependencies": {[m
     "axios": "^1.3.5",[m
[31m-    "vue": "^3.2.45"[m
[32m+[m[32m    "vue": "^3.2.45",[m
[32m+[m[32m    "vue-router": "^4.1.6"[m
   },[m
   "devDependencies": {[m
     "@codesandbox/vue-preview": "^0.1.1-alpha.16",[m
[1mdiff --git a/src/App.vue b/src/App.vue[m
[1mindex 4644cd5..5e8904f 100644[m
[1m--- a/src/App.vue[m
[1m+++ b/src/App.vue[m
[36m@@ -1,13 +1,13 @@[m
[31m-<script setup lang="ts">[m
[31m-import Login from "./views/login/Login.vue";[m
[31m-</script>[m
[32m+[m[32m<script setup lang="ts"></script>[m
 [m
 <template>[m
[31m-  <Login />[m
[32m+[m[32m  <main>[m
[32m+[m[32m    <router-view />[m
[32m+[m[32m  </main>[m
 </template>[m
 [m
 <style scoped>[m
[31m-@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');[m
[32m+[m[32m@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");[m
 [m
 .logo {[m
   height: 6em;[m
[36m@@ -21,5 +21,4 @@[m [mimport Login from "./views/login/Login.vue";[m
 .logo.vue:hover {[m
   filter: drop-shadow(0 0 2em #42b883aa);[m
 }[m
[31m-[m
 </style>[m
[1mdiff --git a/src/main.ts b/src/main.ts[m
[1mindex 2425c0f..cada3c0 100644[m
[1m--- a/src/main.ts[m
[1m+++ b/src/main.ts[m
[36m@@ -1,5 +1,6 @@[m
[31m-import { createApp } from 'vue'[m
[31m-import './style.css'[m
[31m-import App from './App.vue'[m
[32m+[m[32mimport { createApp } from "vue";[m
[32m+[m[32mimport "./style.css";[m
[32m+[m[32mimport App from "./App.vue";[m
[32m+[m[32mimport router from "./router";[m
 [m
[31m-createApp(App).mount('#app')[m
[32m+[m[32mcreateApp(App).use(router).mount("#app");[m
[1mdiff --git a/src/router.ts b/src/router.ts[m
[1mnew file mode 100644[m
[1mindex 0000000..19bbdce[m
[1m--- /dev/null[m
[1m+++ b/src/router.ts[m
[36m@@ -0,0 +1,12 @@[m
[32m+[m[32mimport { createRouter, createWebHistory } from "vue-router";[m[41m[m
[32m+[m[32mimport Login from "./views/login/Login.vue";[m[41m[m
[32m+[m[41m[m
[32m+[m[32mexport default createRouter({[m[41m[m
[32m+[m[32m  history: createWebHistory(),[m[41m[m
[32m+[m[32m  routes: [[m[41m[m
[32m+[m[32m    {[m[41m[m
[32m+[m[32m      path: "/",[m[41m[m
[32m+[m[32m      component: Login,[m[41m[m
[32m+[m[32m    },[m[41m[m
[32m+[m[32m  ],[m[41m[m
[32m+[m[32m});[m[41m[m
