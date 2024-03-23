<template>
  <div class="col-12 d-flex flex-column aligm-itms-start">
    <div class="col-12 col-sm-6 px-0 d-flex">
      <div class="th-options d-flex justify-content-center align-items-center" :class="{ 'active': handleOptions }" @click="toggleOptions()">
        <font-awesome-icon class="f-icon" icon="fa-solid fa-ellipsis-v" />
      </div>
      <div class="options" :class="{ 'active': handleOptions }">
        <div v-for="(option, index) in options" :key="index" class="" @click="action(option.action)">
          <div v-if="!option.disabled" class="options-btn-group">
            <button class="options-btn" :alt="option.label">
              <font-awesome-icon class="f-icon" :icon="option.icon" />
            </button>
            <label>{{ option.label }}</label>
          </div>
        </div>
      </div>
      <div class="col-8 px-0 mx-0 search d-flex align-items-center">
        <div class="col-10 search-input">
          <input id="valueHeaderFilter" class="col-12 px-0 mx-0" type="text" placeholder="abc..." v-model="filter.search" />
        </div>
        <div class="col-2 f-trash-icon d-flex justify-content-center" :class="filter.search ? 'd-block' : 'd-invisible'" @click="clearSearch()">
          <font-awesome-icon :icon="'fa-regular fa-trash-alt'" />
        </div>
      </div>
      <button class="btn search-f-icon" :disabled="!filter.search" @click="searchList()">
        <font-awesome-icon :icon="'fa-solid fa-search'" />
      </button>
    </div>
    <div class="generic-table">
      <table class="">
        <thead>
          <th v-for="(header, indexHead) in objHeader" :key="indexHead">
            <div class="header d-flex justify-content-around" @dblclick="toggleOrderBy(header)">
              {{ header.displayName }}
              <font-awesome-icon class="f-icon" :class="{ 'd-none': orderBy.field != header.name }"
                :icon="header.order ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'" />
            </div>
          </th>
        </thead>
        <tbody v-if="objContents?.length > 0">
          <tr class="row-content" v-for="(row, indexRow) in objContents" :key="indexRow">
            <td v-for="(content, indexCnt) in row" :key="indexCnt">
              <div class="content" @click="selectLine(row, indexRow, $event)">
                {{ content }}
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
    <div class="backdrop-options" :class="{ 'active': handleOptions }" @click="toggleOptions()"></div>
  </div>
</template>

<script>
import { computed, watch, reactive, toRefs, ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";

export default ({
  props: ["objHeader", "objContents", "options", "type", "orderBy"],
  emits: ['action', 'filterSearch', 'orderByField', 'selectedLineObj', 'selectedLineArr'],
  components: {
  },
  name: "GenericTable",
  setup(props, { emit }) {
    const handleOptions = ref(false);
    const filter = ref({
      search: ""
    });
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
      toggleOrderBy(headField) {
        headField.order = !headField.order;
        props.orderBy.field = headField.name;
        props.orderBy.order = headField.order;
        emit('orderByField', props.orderBy);
        methods.clearSelection();
      },
      clearSearch() {
        filter.value.search = "";
        emit('filterSearch', filter.value);
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
        emit('filterSearch', filter.value);
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
      filter,
      selectedLineObj,
      selectedLineArr,
      handleOptions,
      ...toRefs(methods),
    };
  },
});
</script>

<style scoped>
.generic-table {
  padding: 0 !important;
  overflow: auto;
}

table {
  overflow: auto;
  min-width: 500px;
  font-size: 9pt;
}

.search-input input[type="text"] {
  border-style: none;
  outline: none;
  font-size: 9pt;
  background-color: var(--switch-mode-primary) !important;
}

.f-trash-icon {
  cursor:pointer;
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
  opacity: 0.8;
  border-radius: 0 5px 0 0;
  cursor: pointer;
}

.options {
  display: flex;
  margin-top: 2%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  border-radius: 10px;
  height: 0;
  opacity: 0;
  background-color: var(--switch-mode-primary);
  transition: 0.2s;
  z-index: 2;
  overflow-y: hidden;
}

.options.active {
  display: flex;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
  transition: 0.2s;
  padding: 10px 0px;
  height: auto;
  width:200px;
  max-height: 130px;
  min-height: 30px;
  opacity: 1;
}

.options-btn-group {
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  width:170px;
  border-radius: 5px;
  padding: 5px 10px;
  border-bottom-style: solid;
  border-bottom-color: var(--switch-mode-secondary);
  border-bottom-width: 0.2px;
  transition: 0.2s;
}


.options-btn-group:hover {
  background-color: var(--switch-mode-tertiary);
  transition: 0.2s;
}

.options-btn {
  cursor: pointer;
  border-radius: 5px;
  height: 30px;
  width: 30px;
  color: var(--switch-elements-mode-secondary);
  background-color: var(--switch-mode-secondary);
  border-style: none;
  outline: none;
}

.options-btn-group label {
  margin: 0;
  padding-left: 5px;
  cursor: pointer;
  font-size: 9pt;
}

.search{
  background-color: var(--switch-mode-primary);
}


.th-options {
  cursor: pointer;
  width: 30px;
  background-color: var(--decoration-primary-after);
  color: var(--switch-elements-mode-primary);
  border-radius: 5px 0 0 0;
  transition: 0.2s;
}

.th-options.active {
  background-color: var(--switch-mode-primary);
  color: var(--switch-elements-mode-primary);
  transition: 0.2s;
}

thead {
  background-color: var(--decoration-primary);
  color: var(--fixed-dark-mode-tertiary);
  border-radius: 0 5px 0 0;
  user-select: none;
  cursor:pointer;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header .f-icon {
  font-size: 8pt;
}

th{
  padding:5px;
  transition: 0.2s;
}

th:hover {
  transition: 0.2s;
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
  table-layout: fixed;
}

tr {
  cursor: pointer;
  background-color: var(--switch-mode-secondary);
  transition: 0.2s;
}

tr:hover {
  transition: 0.2s;
  background-color: var(--switch-mode-tertiary);
}

td{
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: var(--switch-mode-tertiary);
  padding:5px;
}

td .content {
  word-wrap: break-word;
}
.row-content.selected {
  background-color: var(--switch-mode-tertiary);
  color: var(--switch-elements-mode-primary);
  font-weight: 500;
}
</style>
