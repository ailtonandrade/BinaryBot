<template>
    <div class="row pt-4">
        <div class="col-lg-1 col-md-2 col-sm-2 col-5">
            <select v-if="optionsPagination?.limitOptions?.length > 1" v-model="optionsPagination.limit"
                class="form-control px-0" @change="handleLimitOptions()">
                <option v-for="(option, index) in optionsPagination.limitOptions" :key="index" :value="option">{{ option
                    }}</option>
            </select>
        </div>
        <div v-if="showPaginatorArr.length > 0" class="paginator-box col-4">
            <div class="paginator-item-rl border-radius-left-1 g-button" :class="{ 'not-enable': backwardBtn }"
                @click.prevent="handleOffsetPaginator(-1)">
                &laquo;
            </div>
            <div v-for="(item, index) in showPaginatorArr" :key="index" class="paginator-item g-button"
                :class="{ 'active': item === offsetActive }" @click.prevent="handlePage(item)">
                <input type="text" class="input-offset-active" @change=handlePage($event)
                    v-if="item === offsetActive" :value="item" />
                <span v-else>{{ item }}</span>
            </div>
            <div class="paginator-item-rl border-radius-right-1 g-button" :class="{ 'not-enable': forwardBtn }"
                @click.prevent="handleOffsetPaginator(1)">
                &raquo;
            </div>
        </div>
    </div>
    <div class="resume">
        <span>Total de resultados {{ optionsPagination.maxItems }}</span>
        <span> - </span>
        <span>Página {{ offsetActive }} de {{
                optionsPagination.offsetOptions[optionsPagination.offsetOptions.length - 1] }}.</span>
    </div>
</template>
<script>
import { reactive, onUpdated, toRefs, ref, computed, inject, onMounted } from "vue";

export default ({
    props: ["optionsPagination", 'objContents'],
    emits: ["pagination"],
    components: {},
    name: "Pagination",
    setup(props, { emit }) {
        const optionsPagination = ref(props.optionsPagination);
        const paginationArr = ref([]);
        const indexPaginatorOffset = ref(0);
        const showPaginatorArr = ref([]);
        const offsetActive = computed(() => {
            return optionsPagination.value.offset + 1;
        })
        const backwardBtn = computed(() => {
            if (showPaginatorArr.value?.includes(1)) {
                return true;
            }
            return false;
        });
        const forwardBtn = computed(() => {
            if (paginationArr.value[paginationArr.value?.length - 1]?.opt?.includes(showPaginatorArr.value[showPaginatorArr.value?.length - 1])) {
                return true;
            }
            return false;
        });
        const methods = reactive({
            handleLimitOptions() {
                emit("pagination", props.optionsPagination);
            },
            handlePage(pageNum) {
                console.log(pageNum);
                if (pageNum !== offsetActive.value) {
                    emit('pagination', pageNum - 1);
                }
            },
            handleOffsetPaginator(direction) {
                if ((direction === -1 && !showPaginatorArr.value?.includes(1)) ||
                    (direction === 1 && !paginationArr.value[paginationArr.value?.length - 1]?.opt?.includes(showPaginatorArr.value[showPaginatorArr.value?.length - 1]))) {
                    indexPaginatorOffset.value = indexPaginatorOffset.value + direction;
                    showPaginatorArr.value = paginationArr.value[indexPaginatorOffset.value]?.opt ?? [];
                }
            },
            generatePaginator() {
                if (optionsPagination.value?.offsetOptions?.length > 0) {
                    let opt = [];
                    paginationArr.value = [];
                    optionsPagination.value?.offsetOptions.forEach((item, index) => {
                        if (opt.length < 4) {
                            opt.push(item);
                        } else {
                            opt.push(item);
                            paginationArr.value.push({ opt });
                            opt = [];
                        }
                    })
                }
                showPaginatorArr.value = paginationArr.value[indexPaginatorOffset.value]?.opt ?? [];
            }
        });

        onUpdated(() => {
            if (optionsPagination.value != props.optionsPagination) {
                optionsPagination.value = props.optionsPagination;
                methods.generatePaginator()
            }
        })
        return {
            offsetActive,
            optionsPagination,
            backwardBtn,
            forwardBtn,
            paginationArr,
            indexPaginatorOffset,
            showPaginatorArr,
            ...toRefs(methods)
        };
    }
})
</script>
<style>
.paginator-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--switch-elements-mode-tertiary);
}

.paginator-item-rl {
    background-color: var(--switch-mode-secondary);
}

.paginator-item-rl:hover {
    background-color: var(--switch-mode-tertiary);
}

.paginator-item {
    font-size: 8pt;
    background-color: var(--switch-mode-primary);
}

.paginator-item:hover {
    background-color: var(--switch-mode-secondary);
}

.paginator-item.active {
    background-color: var(--decoration-primary);
}

.paginator-item.active:hover {
    background-color: var(--decoration-primary-after);
}

input[type="text"] {
    border: none;
    width: auto;
    background-color: var(--decoration-primary);
}

.border-radius-right-1 {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.border-radius-left-1 {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.not-enable {
    visibility: hidden;
}

.resume {
    padding: 15px 0;
    gap: 15px;
    font-size: small;
    color: var(--switch-elements-mode-tertiary);
}
</style>