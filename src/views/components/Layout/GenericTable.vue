<template>
  <div class="col-12">
    <div class="col-lg-3 col-md-3 col-sm-4 col-12 mx-4 px-0 ml-auto search">
      <div class="col-10 mx-0 search-input">
        <input id="valueHeaderFilter" class="col-12" type="text" placeholder="abc..." v-model="search" />
      </div>
      <div class="col-1 f-trash-icon" :class="search?.length > 0 ? 'd-block' : 'd-invisible'" @click="clearSearch()">
        <font-awesome-icon :icon="'fa-regular fa-trash-alt'" />
      </div>
      <div class="col-1 h-100 search-f-icon" @click="searchList()">
        <font-awesome-icon :icon="'fa-solid fa-search'" />
      </div>
    </div>
    <div class="col-12 generic-table">
      <table class="col-12">
        <thead>
          <th>
            <div class="th-options p-1" :class="{ 'active': handleOptions }" @click="toggleOptions()">
              <font-awesome-icon class="f-icon" icon="fa-solid fa-ellipsis-v" />
            </div>
          </th>
          <th v-for="(header, indexHead) in objHeader" :key="indexHead">
            <div class="header">
              <div class="col-11">
                {{ header.displayName }}
              </div>
              <div class="col-1">
                <font-awesome-icon class="f-icon"
                  :icon="header.order ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'" />
              </div>
            </div>
          </th>
        </thead>
        <div class="col-lg-3 col-md-3 col-sm-4 col-8 options" :class="{ 'active': handleOptions }">
          <div v-for="(option, index) in options" :key="index" class="options-group col-12" @click="action(option.action)">
            <div v-if="!option.disabled" class="options-btn-group col-12">
              <button class="options-btn" :alt="option.label">
                <font-awesome-icon class="f-icon" :icon="option.icon" />
              </button>
              <label>{{ option.label }}</label>
            </div>
          </div>
        </div>
        <div class="backdrop-options" :class="{ 'active': handleOptions }" @click="toggleOptions()"></div>
        <tbody v-if="filteredObjContents?.length > 0">
          <tr class="row-content" v-for="(row, indexRow) in filteredObjContents" :key="indexRow"
            @click="selectLine(row, indexRow, $event)">
            <td class="content-disabled">
            </td>
            <td v-for="(content, indexCnt) in row" :key="indexCnt">
              <div class="content">
                <span>{{ content }}</span>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <div class="contents-none">
            <h5>Nenhum dado retornado.</h5>
          </div>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, watch, reactive, toRefs, ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";

export default ({
  props: ["objHeader", "objContents", "options", "type"],
  emits: ['action', 'selectedLineObj', 'selectedLineArr'],
  components: {
  },
  name: "GenericTable",
  setup(props, { emit }) {
    const search = ref();
    const handleOptions = ref(false);
    const filteredObjContents = ref(props.objContents);
    const selectedLineObj = ref(null);
    const selectedLineArr = ref(null);

    const methods = reactive({
      action(action) {
        let actionData = {};
        actionData.data = selectedLineObj.value ?? selectedLineArr.value;
        actionData.action = action;
        emit('action', actionData)
        methods.toggleOptions();
      },
      clearSearch() {
        search.value = null;
      },
      toggleOptions() {
        handleOptions.value = !handleOptions.value;
      },

      selectLine(row, indexRow, event) {
        if (!JSON.stringify(event.target.classList).includes("content-disabled")) {
          if (props.type == "array") {
            selectedLineArr.value = selectedLineArr.value == null ? [] : selectedLineArr.value;
            if (JSON.stringify(event.target.parentNode.parentNode.classList).includes("selected")) {
              event.target.parentNode.parentNode.classList.remove('selected');
              selectedLineArr.value = selectedLineArr.value.filter(item => JSON.stringify(item) !== JSON.stringify(row));
              selectedLineArr.value = selectedLineArr.value?.length == 0 ? null : selectedLineArr.value;
            } else {
              selectedLineArr.value.push(row);
              event.target.parentNode.parentNode.classList.add('selected');
            }
            emit('selectedLineArr', selectedLineArr.value);
          } else if (props.type == "object") {
            if (JSON.stringify(event.target.parentNode.parentNode.classList).includes("selected")) {
              event.target.parentNode.parentNode.classList.remove('selected');
              selectedLineObj.value = null;
            } else {
              methods.clearSelection();
              selectedLineObj.value = row;
              event.target.parentNode.parentNode.classList.add('selected');
            }
            emit('selectedLineObj', selectedLineObj.value);
          }
        }
      },
      searchList() {
        methods.clearSelection();
        if (props.objContents && search.value) {
          filteredObjContents.value = props.objContents.filter(item => JSON.stringify(item).includes(search.value));
        } else {
          filteredObjContents.value = props.objContents;
        }
      },
      clearSelection() {
        const elementosSelecionados = document.querySelectorAll('.row-content.selected');
        elementosSelecionados.forEach(e => {
          e.classList.remove('selected');
        });

        selectedLineObj.value = null;
        selectedLineArr.value = null;
      }
    });


    return {
      search,
      selectedLineObj,
      selectedLineArr,
      filteredObjContents,
      handleOptions,
      ...toRefs(methods),
    };
  },
});
</script>

<style scoped>
.generic-table {
  overflow: auto;
}

table {
  overflow: auto;
  min-width: 700px;
  font-size: 9pt;
}

.search {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-radius: 5px;
  border-style: solid;
  border-color: var(--switch-mode-tertiary);
  border-width: 1px;
  padding: 0 5px;
  background-color: var(--switch-mode-primary);
  margin: 5px 0;
}

.search-input input[type="text"] {
  border-style: none;
  outline: none;
  padding: 0 5px;
  height: 100%;
  font-size: 10pt;
  background-color: var(--switch-mode-primary) !important;
}

.f-trash-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 8pt;
  color: var(--switch-elements-mode-primary);
  opacity: 0.4;
}

.search-f-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--switch-mode-tertiary) !important;
  color: var(--switch-elements-mode-secondary);
  border-color: var(--switch-mode-tertiary);
  opacity: 0.8;
  cursor: pointer;
}

.search-f-icon:hover {
  opacity: 1;
}

.options {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: fixed;
  border-radius: 10px;
  margin: 1px 50px;
  height: 0;
  opacity: 0;
  background-color: var(--switch-mode-primary);
  transition: 0.2s;
  z-index: 2;
  overflow-y: hidden;
}

.options.active {
  overflow-y: auto;
  transition: 0.2s;
  margin: -10px 40px;
  padding: 10px 10px;
  height: auto;
  max-height: 130px;
  min-height: 30px;
  opacity: 1;
}

.options-btn-group {
  display:flex;
  justify-content:start;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  padding: 5px 10px;
  border-bottom-style: solid;
  border-bottom-color: var(--switch-mode-secondary);
  border-bottom-width: 0.2px;
  transition: 0.2s;
}

.backdrop-options {
  position: fixed;
  opacity: 0;
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  background-color: black;
  z-index: 1;
  transition: 0.2s;
}

.backdrop-options.active {
  width: 100%;
  height: 100%;
  opacity: 0.2;
  transition: 0.2s;
}

.options-btn-group:hover {
  background-color: var(--switch-mode-tertiary);
  transition: 0.2s;
}

.options-btn-group label {
  cursor: pointer;
}

.options-btn {
  cursor: pointer;
  border-radius: 5px;
  height: 30px;
  width: 30px;
  margin: 2px 5px;
  color: var(--switch-elements-mode-secondary);
  background-color: var(--switch-mode-secondary);
  border-style: none;
  outline: none;
}

.options-btn:hover {
  background-color: var(--switch-mode-tertiary);
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 40px;
  padding: 0 15px;
}

.header .f-icon {
  font-size: 8pt;
}

thead th:first-child,
.th-options {
  user-select: none;
  cursor: pointer;
  width: 30px;
  background-color: var(--decoration-primary-after);
  color: var(--switch-elements-mode-primary);
  box-shadow: -1px 1px 2px 0.5px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
}

.th-options.active {
  background-color: var(--switch-mode-primary);
  color: var(--switch-elements-mode-primary);
  transition: 0.2s;
}

thead {
  background-color: var(--decoration-primary);
  color: var(--switch-mode-secondary);
  border-radius: 5px 5px 0 0;
}

th:hover {
  background-color: var(--decoration-primary-after);
}

tbody {
  display: block;
  height: 200px;
  overflow: auto;
}

thead,
tbody tr {
  display: table;
  width: 100%;
}

td {
  padding: 0 0px;
}

td .content {
  display: flex;
  justify-content: start;
  align-items: center;
}

td .content-disabled {
  pointer-events: none;
}

td:first-child {
  width: 20px;
}

tr {
  table-layout: fixed;
  background-color: var(--switch-mode-secondary);
}

tr:hover {
  background-color: var(--switch-mode-tertiary);
}

.row-content.selected {
  background-color: var(--decoration-primary);
  color: var(--switch-mode-primary);
}


.generic-table::-webkit-scrollbar,
tbody::-webkit-scrollbar,
.options::-webkit-scrollbar {
  height: 7px;
  width: 7px;
}

.generic-table::-webkit-scrollbar-thumb,
tbody::-webkit-scrollbar-thumb,
.options::-webkit-scrollbar-thumb {
  background-color: var(--decoration-primary-after);
}

.generic-table::-webkit-scrollbar-track,
tbody::-webkit-scrollbar-track,
.options::-webkit-scrollbar-track {
  background-color: var(--switch-elements-mode-tertiary);
}

.contents-none {
  opacity: 0.5;
  margin: 10px;
}
</style>
