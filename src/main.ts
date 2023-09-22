import { createApp, ref, inject, provide } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
provide('test', {val:"test"})
app.use(router).mount("#app");