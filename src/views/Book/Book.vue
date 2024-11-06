<template>
  <CardBoxBook :title="pageConfig.title" :description="pageConfig.description" :breadcrumb="[]">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <div class="">
            <img class="img-perfil b-radius-100 b-shadow-2" :src="handleImgUser()" />
          </div>
          <div class="card-custom">
            <span>
              Para exibir o Datepicker sempre ativo em modo de exibição e aplicar o modo escuro, é necessário
              configurar
              o componente para aparecer diretamente, sem depender do clique no input. Aqui está como ajustar o
              código
              para que o calendário do Datepicker fique visível permanentemente e estilizado para o tema escuro:

              Defina a exibição do Datepicker diretamente, sem esperar pelo clique.
              Ajuste o estilo para o modo escuro conforme o solicitado.
              Aqui está o código atualizado:
            </span>
            <div class="social-media">
              <a href="https://www.instagram.com" target="_blank">
                <font-awesome-icon class="brands" icon="fa-brands fa-instagram" />
              </a>
              <a href="https://www.facebook.com" target="_blank">
                <font-awesome-icon class="brands" icon="fa-brands fa-facebook" /> </a>
              <a href="https://www.youtube.com" target="_blank">
                <font-awesome-icon class="brands" icon="fa-brands fa-youtube" /> </a>
            </div>
          </div>
        </div>
        <div class="">
          <!-- Exibindo o Datepicker permanentemente em modo dark -->
          <Datepicker v-model="selectedDate" :style="darkModeStyles" :inline="true" />
        </div>
      </div>
    </div>
  </CardBoxBook>
</template>

<script>
import { ref, onMounted, reactive, toRefs, inject } from "vue";
import PerfilService from "@/services/PerfilService";
import GenericTable from "@/views/components/GenericTable/GenericTable.vue";
import CardBoxBook from "@/views/components/Layout/CardBoxBook.vue";
import { useRouter } from "vue-router";
import ObjectUtils from "@/Utils/ObjectUtils";
import Datepicker from 'vue3-datepicker';

export default {
  components: { CardBoxBook, GenericTable, Datepicker },
  setup() {
    const router = useRouter();
    const isDarkMode = inject("isDarkMode");
    const pageConfig = ref({
      title: "Otomandrade",
      description: "Agende seu atendimento",
      imgUser: "img/img-user-blank.png"
    });
    const selectedDate = ref(null);

    const darkModeStyles = {
      '--dp-background': '#333',  /* Fundo do calendário */
      '--dp-color': '#fff',       /* Cor do texto */
      '--dp-hover': '#555',       /* Cor de hover dos dias */
      '--dp-border': '#444',      /* Cor das bordas */
      '--dp-selected': '#666'     /* Cor do dia selecionado */
    };

    const methods = reactive({
      getAll(event) {
        // Implementação de chamada ao serviço
      },
      handleImgUser() {
        const imgUser = pageConfig.value.imgUser;
        if (imgUser === ObjectUtils.getImgBlank()) {
          return require(`@/assets/${imgUser}`);
        }
        return ObjectUtils.getImgFromBytes(imgUser);
      }
    });

    onMounted(() => {
      methods.getAll();
    });

    return {
      isDarkMode,
      router,
      selectedDate,
      pageConfig,
      darkModeStyles,
      ...toRefs(methods),
    };
  }
};
</script>

<style scoped>
.dp__container {
  background-color: var(--dp-background) !important;
  color: var(--dp-color) !important;
}

.dp__day:hover {
  background-color: var(--dp-hover) !important;
}

.dp__day--selected,
.dp__day--today {
  background-color: var(--dp-selected) !important;
  color: var(--dp-color) !important;
}

.dp__border {
  border-color: var(--dp-border) !important;
}

/* Estilos para imagem e sombra */
.b-radius-100 {
  border-radius: 100%;
}

.b-shadow-2 {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.img-perfil {
  max-width: 150px;
}

.brands {
  margin-top: 30px;
  height: 25px;
  padding: 0 10px;
  color: var(--switch-mode-elements-tertiary);
  transition: 0.2s;
}

.brands:hover {
  padding: 0 10px;
  color: var(--decoration-primary);
  transition: 0.2s;
}

.card-custom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: -20px;
  margin-left: 0px;
  padding: 50px 20px;
  text-align: justify;
  border-radius: 10px;
  min-height: 400px;
  background-color: var(--switch-mode-tertiary);
}
</style>
