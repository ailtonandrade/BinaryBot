<template>
  <div :id="'modal-custom-' + reference" class="modal-body">
    <div class="col-12 modal-box">
      <div class="flex-row">
        <div class="d-flex align-center justify-start col-10">
          <font-awesome-icon v-if="configModal.icon != null" class="modal-icon-modal" :icon="configModal.icon" size="1x" />
          <h1 v-if="configModal.title != null" class="modal-title">{{ configModal.title }}</h1>
        </div>
        <div :class="configModal.icon != null ? 'col-2' : 'col-12'" class="flex align-center flex-center">
          <button @click="closeModal()" class="modal-btn-close">x</button>
        </div>
      </div>
      <hr />
      <!-- MODAL CONTENT HERE -->
      <!-- MODAL CONTENT HERE -->
      <!-- MODAL CONTENT HERE -->
      <div class="modal-box-content">
        <div class="col-12">
          <div v-if="configModal?.action?.includes('add')">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-12 py-2">
                <div class="flex-column justify-center modal-icon-area-menu  b-shadow-1">
                  <div class="d-flex justify-center py-1">
                    <font-awesome-icon class="" :icon="data?.icon ?? 'fa-regular fa-circle'"
                      size="2x"></font-awesome-icon>
                  </div>
                  <small class="">Icon </small><br />
                  <small class="modal-sub-text-name">Atribua um icone para representar esta nova rota.</small>
                  <input class="form-control b-radius-top-0" @blur="setIcon($event)" v-model="data.icon" />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12">
                <div class="flex-column align-center justify-center modal-icon-area-menu  b-shadow-1">
                  <small class="">Name </small><br />
                  <small class="modal-sub-text-name">Define o nome da rota que será concatenada ao path.</small>
                  <input class="form-control small b-radius-top-0" @keyup="toLower($event)" v-model="data.name" />
                  <small class="">Display Name </small><br />
                  <small class="modal-sub-text-name">Adiciona um apelido ou uma descrição breve da rota.</small>
                  <input class="form-control small b-radius-top-0" v-model="data.displayName" />
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <span class="modal-text-message">{{ configModal?.message }}</span>
          </div>
        </div>
      </div>
      <!-- MODAL CONTENT HERE -->
      <!-- MODAL CONTENT HERE -->
      <!-- MODAL CONTENT HERE -->
      <hr />
      <div v-if="configModal.action" class="flex-row">
        <div class="col-12 flex justify-center">
          <button class="modal-btn-action-confirm" @click="toAction()">
            Confirmar e Salvar alterações
          </button>
        </div>
      </div>
    </div>
    <div @click="closeModal()" class="modal-box-back"></div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, inject, ref, computed } from "vue";
export default defineComponent({
  emits: ["closeModal", "execute"],
  props: ["reference"],
  name: "ModalConfirmActionPage",
  setup(props, { emit }) {
    const closeModalCustom = inject("closeModalCustom");
    const configModal = inject("configModalCustom");
    const data = ref({
      icon: 'fa-regular fa-circle',
      name: '',
      displayName: ''
    });
    const methods = reactive({
      closeModal() {
        closeModalCustom(configModal.value);
        data.value = {
          icon: 'fa-regular fa-circle',
          name: '',
          displayName: ''
        };
      },
      setIcon(event) {
        if (!event?.target?.value?.includes('fa-')) {
          data.value.icon = 'fa-' + event?.target?.value;
        }
      },
      toLower(event) {
        event.target.value = event.target.value.toLowerCase();
      },
      toAction() {
        let obj = configModal.value;
        obj.data = data.value;
        console.log("execute")
        console.log(obj)
        emit("execute", obj);
        methods.closeModal();
      },
    });
    return {
      data,
      configModal,
      closeModalCustom,
      ...toRefs(methods),
    };
  },
});
</script>
