<template>
  <CardBoxBook :title="pageConfig.title" :description="pageConfig.description" :breadcrumb="[]">
    <div class="container-fluid">
      <div class="d-flex flex-wrap">
        <div class="col-lg-6 col-md-6 col-12 p-1">
          <div class="d-flex justify-content-lg-start justify-content-md-start justify-content-center">
            <img class="img-perfil b-radius-100 b-shadow-2" :src="handleImgUser()" />
          </div>
          <div class="card-custom">
            <span>
              Para exibir um calendário sempre visível e em modo escuro, você pode utilizar o vue3-datepicker.
              Aqui está um exemplo de como configurar o vue3-datepicker:
            </span>
            <div class="social-media">
              <a href="https://www.instagram.com" target="_blank">
                <font-awesome-icon class="brands" icon="fa-brands fa-instagram" />
              </a>
              <a href="https://www.facebook.com" target="_blank">
                <font-awesome-icon class="brands" icon="fa-brands fa-facebook" />
              </a>
              <a href="https://www.youtube.com" target="_blank">
                <font-awesome-icon class="brands" icon="fa-brands fa-youtube" />
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12 p-1 d-flex align-items-center justify-content-center">
          <DatePicker id="datepicker-24h" showTime hourFormat="24" fluid v-model="selectedDate" inline showWeek
            class="w-full calendar-custom" @click="handleSelectedDate()" :showIcon="true" placeholder="Selecione uma data"
            showButtonBar />
        </div>
      </div>
    </div>
  </CardBoxBook>
</template>

<script>
import { ref, onMounted, computed, reactive, toRefs, inject } from "vue";
import GenericTable from "@/views/components/GenericTable/GenericTable.vue";
import CardBoxBook from "@/views/components/Layout/CardBoxBook.vue";
import { useRouter } from "vue-router";
import ObjectUtils from "@/Utils/ObjectUtils";
import DatePicker from 'primevue/datepicker';

export default {
  components: { CardBoxBook, GenericTable, DatePicker },
  setup() {
    const router = useRouter();
    const isDarkMode = inject("isDarkMode");
    const pageConfig = ref({
      title: "Otomandrade",
      description: "Agende seu atendimento",
      imgUser: "img/img-user-blank.png"
    });

    const selectedDate = ref(null);
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
      },
      handleSelectedDate() {
        console.log("Data selecionada:", selectedDate.value);
      }
    });

    onMounted(() => {
      document.querySelectorAll(".p-datepicker-minute-picker")[0].classList.add("disabled");
      const elem = document.querySelectorAll(".p-datepicker-minute-picker");
      elem[0].children[1].innerHTML = '00';
      elem[0].children[0].disabled = true;
      elem[0].children[2].disabled = true;
      console.log(elem);
      methods.getAll();
    });

    return {
      isDarkMode,
      router,
      selectedDate,
      pageConfig,
      ...toRefs(methods),
    };
  }
};
</script>

<style scoped>
.b-radius-100 {
  border-radius: 100%;
}

.b-shadow-2 {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.img-perfil {
  max-width: 150px;
}

.calendar-custom {
  border-radius: 10px;
  padding: 10px;
  margin: 5px 0;
  background-color: var(--switch-mode-tertiary);
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
  background-color: var(--switch-mode-tertiary);
}

/* Estilos para o calendário em modo escuro */
.dark-mode-calendar .vue3-datepicker__calendar {
  background-color: #2c2c2c;
  color: #ffffff;
}

.dark-mode-calendar .vue3-datepicker__header {
  background-color: #444;
  color: #ffffff;
}

.dark-mode-calendar .vue3-datepicker__day--today {
  background-color: #ff6600;
  color: #fff;
}

.dark-mode-calendar .vue3-datepicker__day--selected {
  background-color: #ffcc00;
  color: #000;
}
</style>
