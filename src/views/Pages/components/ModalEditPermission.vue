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
            <div class="col-lg-5 col-md-5 col-12 area-selector">
              <div class="col-12 d-flex justify-content-center">
                <div class="col-11 area-search">
                  <div class="col-2 px-0 icon">
                    <font-awesome-icon class="" :icon="'fa-solid fa-search'" size="1x" />
                  </div>
                  <div class="col-10 px-0">
                    <input class="form-control" type="text" v-model="filterAble" />
                  </div>
                </div>
              </div>
              <div v-for="(p) in filteredAblePerms" :key="p.id + p.name">
                <div class="row selection px-0 mx-0">
                  <div class="col-12">
                    <b>{{ p.name }}</b>
                  </div>
                  <div class="col-12">
                    <small>{{ p.description }}</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5 col-md-5 col-12 area-selector">
              <div class="col-12 d-flex justify-content-center">
                <div class="col-11 area-search">
                  <div class="col-2 px-0 icon">
                    <font-awesome-icon class="" :icon="'fa-solid fa-search'" size="1x" />
                  </div>
                  <div class="col-10 px-0">
                    <input class="form-control" type="text" v-model="filterSelected" />
                  </div>
                </div>
              </div>
              <div v-for="(p) in selectedPerms" :key="p.permission.id + p.permission.name">
                <div class="col-12 selection active p-0 mx-0">
                  <div class="col-10 px-0 mx-0">
                    <div class="col-12">
                      <b>{{ p.permission.name }}</b>
                    </div>
                    <div class="col-12">
                      <small>{{ p.permission.description }}</small>
                    </div>
                  </div>
                  <div class="col-2 px-0 mx-0 area-remove-selected">
                    <span class="remove-selected">x</span>
                  </div>
                </div>
              </div>
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

export default defineComponent({
  emits: ["closeModal", "execute"],
  props: ["reference"],
  name: "ModalEditPermission",
  setup(props, { emit }) {
    const closeModalCustom = inject("closeModalCustom");
    const configModal = ref(inject("configModalCustom"));
    const ablePerms = ref([]);
    const filterAble = ref("");
    const filterSelected = ref("");
    const selectedPerms = ref(inject("selectedPerms"));
    const filteredAblePerms = computed(() => {
      let names = selectedPerms.value?.map(s => s.permission?.name);
      return ablePerms.value?.filter(p =>
        !names.includes(p.name)
      );
    })
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
      getAllPermissions() {
        MenuService.getAllPermissions()
          .then((resp) => {
            if (resp) {
              resp.forEach((r) => {
                ablePerms.value.push({
                  id: r.id,
                  name: r.name,
                  description: r.description
                })
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    });

    onMounted(() => {
      methods.getAllPermissions();
    })
    return {
      data,
      filterAble,
      filterSelected,
      ablePerms,
      filteredAblePerms,
      selectedPerms,
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
