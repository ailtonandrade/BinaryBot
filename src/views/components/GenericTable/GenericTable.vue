<template>
  <div class="col-12 d-flex flex-column align-items-start">
    <FilterSearch :options="options" :type="type" :objContents="objContents"
      @handleSelectionAll="handleSelectionAll($event)" />
    <div class="generic-table">
      <table>
        <thead>
          <tr>
            <th v-for="(header, indexHead) in objHeader" :key="indexHead">
              <div class="header d-flex justify-content-around" @dblclick="toggleOrderBy(header)">
                {{ header.displayName }}
                <font-awesome-icon class="f-icon" :class="{ 'd-none': orderBy.field != header.name }"
                  :icon="header.order ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="objContents?.length && objContents?.length > 0">
          <tr class="row-content" v-for="(row, indexRow) in objContents" :key="indexRow">
            <td v-for="(content, indexCnt) in row" :key="indexCnt">
              <div class="content" @click="selectLine(row, indexRow, $event)">
                {{ content }}
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="100%">
              <div class="contents-none">
                <h5>Nenhum dado retornado.</h5>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :optionsPagination="pagination" @pagination="togglePagination($event)" />
    <div class="backdrop-options" :class="{ 'active': handleOptions }" @click="toggleOptions()"></div>
  </div>
</template>


<script>
import { computed, watch, reactive, toRefs, ref, inject, provide, onMounted } from "vue";
import { useRouter } from "vue-router";
import FilterSearch from "./Components/FilterSearch.vue";
import Pagination from "./Components/Pagination.vue";

export default ({
  props: ["objHeader", "options", "type", "orderBy"],
  emits: ['action', 'filterSearch', 'orderByField', 'selectedLineObj', 'selectedLineArr', "togglePagination"],
  components: {
    FilterSearch,
    Pagination
  },
  name: "GenericTable",
  setup(props, { emit }) {
    const handleOptions = ref(false);
    const pagination = inject("pagination");
    const objContents = inject("contentTable");
    const filter = ref({
      search: ""
    });
    const selectedLineObj = ref(null);
    const selectedLineArr = ref(null);
    const toggleSelection = ref(false);
    const methods = reactive({
      action(action) {
        let actionData = {};
        actionData.data = selectedLineObj.value ?? selectedLineArr.value;
        actionData.action = action;
        methods.clearSelection();
        emit('action', actionData);
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
      handleSelectionAll(event) {
        if (event) {
          if (props.type === "array") {
            const elementos = document.querySelectorAll('.row-content');
            elementos.forEach(e => {
              e.classList.add('selected');
            });
            selectedLineArr.value = props.objContents;
          }
        } else {
          methods.clearSelection();
        }
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
        //pagination.value.offsetOptions = [];
        //pagination.value.dataSet = [];
        //pagination.value.maxItems = 0;

        toggleSelection.value = false;
        selectedLineObj.value = null;
        selectedLineArr.value = null;
      }
    });

    onMounted(() => {
      methods.clearSelection();
    })

    provide("toggleSelection", toggleSelection);
    provide("handleOptions", handleOptions);
    provide("filter", filter);
    provide("toggleOptions", methods.toggleOptions);
    provide("clearSearch", methods.clearSearch);
    provide("searchList", methods.searchList);
    provide("action", methods.action);

    return {
      filter,
      pagination,
      objContents,
      selectedLineObj,
      selectedLineArr,
      toggleSelection,
      handleOptions,
      ...toRefs(methods),
    };
  },
});
</script>

<style scoped>
.generic-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  min-width: 300px;
}

thead {
  width: 100%;
  background-color: var(--decoration-primary);
  color: var(--fixed-dark-mode-tertiary);
  user-select: none;
  cursor: pointer;
}

thead th {
  width: 100%;
  padding: 10px;
  text-align: left;
  font-size: 9pt;
}

tbody {
  display: table-row-group; /* Garante que o tbody compartilhe o mesmo comportamento que o thead */
}

tbody tr:hover {
  background-color: var(--switch-mode-tertiary);
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--switch-mode-tertiary);
  word-wrap: break-word;
  width: auto;
}

.row-content.selected {
  background-color: var(--switch-mode-tertiary);
  color: var(--switch-mode-elements-primary);
  font-weight: 500;
}

.contents-none {
  text-align: center;
  padding: 10px;
}

</style>
