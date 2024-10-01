<template>
  <div :id="'modal-custom-' + reference" class="modal-body">
    <div class="col-12 modal-box">
      <div class="flex-row">
        <div class="d-flex align-center justify-start col-10">
          <font-awesome-icon v-if="configModal.icon != null" class="modal-icon-modal" :icon="configModal.icon"
            size="1x" />
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
      <div class="d-flex flex-column align-items-center justify-content-center">
        <div class="col-10">
          <div class="col-12 py-2">
            <div class="flex-column justify-center modal-icon-area-menu  b-shadow-1">
              <label for="modal-sub-text-name">Nome</label>
              <input id="modal-sub-text-name" @keyup="onlyTextNoSpace($event)" class="form-control b-radius-top-0"
                v-model="data.name" />
            </div>
          </div>
          <div class="col-12 py-2">
            <div class="flex-column justify-center modal-icon-area-menu  b-shadow-1">
              <label for="modal-sub-text-description">Descrição</label>
              <input id="modal-sub-text-description" class="form-control b-radius-top-0" v-model="data.description" />
            </div>
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
import { onMounted } from "vue";
import { defineComponent, reactive, toRefs, inject, ref, computed } from "vue";
import MenuService from "@/services/MenuService";
import { onUpdated } from "vue";

export default defineComponent({
  emits: ["closeModal", "execute"],
  props: ["reference"],
  name: "ModalPermission",
  setup(props, { emit }) {
    const closeModalCustom = inject("closeModalCustom");
    const configModal = ref(inject("configModalCustom"));
    const data = computed(() => {
      console.log("configModal")
      console.log(configModal.value)
      return {
        id: configModal.value?.obj?.Id ?? null,
        title: configModal.value?.title ?? '',
        message: configModal.value?.message ?? '',
        name: methods.onlyTextNoSpace(configModal.value?.obj?.Name ?? ''),
        description: configModal.value?.obj?.Description ?? '',
        action: configModal.value?.action ?? ''
      }
    });
    const methods = reactive({
      closeModal() {
        closeModalCustom(configModal.value);
      },
      toAction() {
        emit("execute", data.value);
        methods.closeModal();
      },
      onlyTextNoSpace(event) {
        return event.target?.value ?? event
          .toUpperCase()
          .replace(/[^A-Z]/g, '');
      }
    });

    onMounted(() => {
    })

    onUpdated(() => {
    })
    return {
      data,
      configModal,
      closeModalCustom,
      ...toRefs(methods),
    };
  },
});
</script>
<style scoped>
.area-content {
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
}

input[type="text"] {
  background-color: var(--switch-mode-primary) !important;
  border-style: none !important;
}
</style>
