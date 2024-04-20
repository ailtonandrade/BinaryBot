<template>
  <div class="col-12 d-flex flex-column aligm-itms-start">
    <FilterSearch :options="options" />
    <div class="generic-table">
      <table>
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
    <Pagination :optionsPagination="pagination" @pagination="togglePagination($event)" />
    <div class="backdrop-options" :class="{ 'active': handleOptions }" @click="toggleOptions()"></div>
  </div>
</template>

<script>
import { computed, watch, reactive, toRefs, ref, inject, provide } from "vue";
import { useRouter } from "vue-router";
import FilterSearch from "./Components/FilterSearch.vue";
import Pagination from "./Components/Pagination.vue";

export default ({
  props: ["objHeader", "objContents", "options", "type", "orderBy"],
  emits: ['action', 'filterSearch', 'orderByField', 'selectedLineObj', 'selectedLineArr', "togglePagination"],
  components: {
    FilterSearch,
    Pagination
  },
  name: "GenericTable",
  setup(props, { emit }) {
    const handleOptions = ref(false);
    const pagination = inject("pagination");
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
      togglePagination(option) {
        pagination.value.offset = option;
        emit('togglePagination');
        methods.clearSelection();
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

    provide("handleOptions", handleOptions);
    provide("toggleOptions", methods.toggleOptions);
    provide("clearSearch", methods.clearSearch);
    provide("searchList", methods.searchList);
    provide("action", methods.action);
    provide("filter", filter);

    return {
      filter,
      pagination,
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

thead {
  background-color: var(--decoration-primary);
  color: var(--fixed-dark-mode-tertiary);
  border-radius: 0 5px 0 0;
  user-select: none;
  cursor: pointer;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header .f-icon {
  font-size: 8pt;
}

th {
  padding: 5px;
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

td {
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: var(--switch-mode-tertiary);
  padding: 5px;
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
