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
      <div class="modal-box-content">
        <div class="container">
          <div class="row area-content">

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

export default defineComponent({
  emits: ["closeModal", "execute"],
  props: ["reference"],
  name: "ModalPermission",
  setup(props, { emit }) {
    const closeModalCustom = inject("closeModalCustom");
    const configModal = ref(inject("configModalCustom"));
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
      toAction() {
        let obj = configModal.value;
        obj.data = selectedPerms.value;
        emit("execute", obj);
        methods.closeModal();
      },
    });

    onMounted(() => {
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

.area-search {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  border-style: solid;
  border-width: 1px;
  border-color: var(--switch-mode-tertiary);
  color: var(--switch-mode-elements-secondary);
  background-color: var(--switch-mode-primary);
  border-radius: 5px;
}

input[type="text"] {
  background-color: var(--switch-mode-primary) !important;
  border-style: none !important;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--switch-mode-tertiary);
  color: var(--switch-mode-elements-primary);
}

.area-selector {
  background-color: var(--switch-mode-primary);
  border-radius: 5px;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px 5px;
}

.selection {
  display: flex;
  cursor: pointer;
  border-style: solid;
  border-width: 1px;
  border-color: var(--switch-mode-tertiary);
  color: var(--switch-mode-elements-secondary);
  background-color: var(--switch-mode-primary);
  border-radius: 5px;
  padding: 5px 15px;
  margin: 5px;
}

.selection.active {
  cursor: unset;
  color: var(--switch-mode-elements-secondary);
  background-color: var(--switch-mode-tertiary);
}

.selection:hover {
  background-color: var(--switch-mode-tertiary);
}

.area-remove-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: var(--switch-mode-secondary);
}

.area-remove-selected:hover {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--switch-mode-elements-primary);
  background-color: var(--switch-mode-secondary);
}
</style>
