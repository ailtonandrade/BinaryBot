import { createApp, provide, ref } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// Importa o estilo do tema do PrimeVue (exemplo com o tema "saga-blue")

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

const isDarkMode = ref(true);

library.add(fas)
library.add(far)
library.add(fab)

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: isDarkMode,
        }
    },
    locale: {
        firstDayOfWeek: 1,
        dayNames: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
        dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
        dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
        monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
        monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
        today: "Hoje",
        clear: "Limpar",
        dateFormat: "dd/mm/yy",
        weekHeader: "Sem"
    }
});

app.provide('isDarkMode', isDarkMode);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");
