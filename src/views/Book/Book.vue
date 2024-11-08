<template>
  <div class="book">
    <CardBoxBook :title="pageConfig.title" :description="pageConfig.description" :breadcrumb="[]">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-12 px-1 py-4">
            <div class="titles">
              <span class="title-label">Sobre</span>
              <div class="separator-line"></div>
            </div>
            <Infos />
          </div>
          <div class="col-lg-6 col-md-6 col-12 px-1 py-4">
            <div class="titles">
              <span class="title-label">Calenrário</span>
              <div class="separator-line"></div>
            </div>
            <Calendar />
          </div>
          <div class="col-lg-6 col-md-6 col-12 px-1 py-4">
            <div class="titles">
              <span class="title-label">Serviços e Produtos</span>
              <div class="separator-line"></div>
            </div>
            <Services />
          </div>
          <div class="col-lg-6 col-md-6 col-12 px-1 py-4">
            <div class="titles">
              <span class="title-label">Contato</span>
              <div class="separator-line"></div>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </CardBoxBook>
  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs, provide, inject } from "vue";
import CardBoxBook from "@/views/components/Layout/CardBoxBook.vue";
import { useRouter } from "vue-router";
import Infos from "./components/Infos.vue";
import Calendar from "./components/calendar.vue";
import Services from "./components/services.vue";
import Form from "./components/form.vue";
import BookService from "@/services/BookService";

export default {
  components: { CardBoxBook, Calendar, Infos, Services, Form },
  setup() {
    const router = useRouter();
    const isDarkMode = inject("isDarkMode");
    const openModalBox = inject("openModalBox");
    const openModalCustom = inject("openModalCustom");
    const addMessageBox = inject("addMessageBox");
    const pageDefaults = ref({
      imgUser: "img/img-user-blank.png",
      imgCoverUser: "img/img-cover-blank.png"
    });
    const pageConfig = ref({
      title: "Book perdido  =( ???",
      description: "Começe um novo book e gerencie seus agendamentos",
      data: {
        bookName: null,
        bookTitle: null,
        darkMode: null,
        themePrimaryColor: null,
        themeSecondaryColor: null,
        imgUser: null,
        imgCoverUser: null,
        bio: null,
        linkInstagram: null,
        linkFacebook: null,
        linkYoutube: null,
        linkSite: null,
        email: null,
        phone: null,
        disabledDays: [],
        servicesList: [],
        address: {
          displayAddress: null,
          linkGoogleMaps: null,
        }
      }
    });

    const pageForm = ref({
      idBook: pageConfig.value.id,
      selectedService: null,
      nome: null,
      telefone: null,
      mensagem: null,
      selectedDate: null
    });

    const methods = reactive({
      getAll() {
        BookService.getAllBookInfo(pageConfig.value)
          .then((resp) => {
            pageConfig.value = methods.responseTable(resp);
          })
          .catch((ex) => {
            addMessageBox(
              "Oops...",
              "Esse book não foi encontrado.",
              null,
              "danger",
              null
            );
          });
      },
      responseTable(resp) {
        console.log(resp);
        return resp;
      }
    });

    provide("pageConfig", pageConfig);
    provide("pageForm", pageForm);
    provide("pageDefaults", pageDefaults);

    onMounted(() => {
      pageConfig.value.data.bookName = router.currentRoute?.value?.path?.split("/")[1];
      methods.getAll();
    });

    return {
      isDarkMode,
      router,
      pageConfig,
      pageForm,
      pageDefaults,
      openModalBox,
      openModalCustom,
      addMessageBox,
      ...toRefs(methods),
    };
  }
};
</script>

<style scoped>
.book {
  display: flex;
  justify-content: center;
}

.titles {
  margin: 20px 0;
}

.separator-line {
  width: 30%;
  height: 2px;
  margin: 0 10px;
  background-color: var(--decoration-primary);
}

.title-label {
  margin: 10px 0;
  padding: 10px;
  font-weight: 600;
  font-size: large;
  color: var(--decoration-primary);
}
</style>
