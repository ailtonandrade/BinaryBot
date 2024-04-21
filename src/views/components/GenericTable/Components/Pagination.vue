<template>
    <div class="row pt-4">
        <div class="col-lg-1 col-md-2 col-sm-2 col-12 mb-4">
            <select v-if="optionsPagination?.limitOptions?.length > 1" v-model="optionsPagination.limit"
                class="form-control px-0" @change="handleLimitOptions()">
                <option v-for="(option, index) in optionsPagination.limitOptions" :key="index" :value="option">{{ option
                    }}</option>
            </select>
        </div>
        <div v-if="showPaginatorArr.length > 1" class="paginator-box col-lg-3 col-md-5 col-sm-6 col-12 mb-4">
            <div class="paginator-item-rl border-radius-left-1 g-button" :class="{ 'not-enable': backwardBtn }"
                @click.prevent="handleOffsetPaginator(-1)">
                &laquo;
            </div>
            <div v-for="(item, index) in showPaginatorArr" :key="index" class="paginator-item g-button"
                :class="{ 'active': item === offsetActive }" @click.prevent="handlePage(item)">
                <input type="text" class="input-offset-active m-0 p-0" @change=handlePage($event)
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
        <span>Página {{ offsetActive }} de {{ maxPaginatorArr }}</span>
    </div>
</template>
<script>
import { reactive, onUpdated, toRefs, ref, computed, inject, onMounted } from "vue";
import ObjectUtils from '@/Utils/ObjectUtils.js';

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
        const maxPaginatorArr = computed(() => {
            return optionsPagination.value?.offsetOptions[optionsPagination.value?.offsetOptions.length - 1];
        })
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
                indexPaginatorOffset.value = 0;
                emit("pagination", 0);
            },
            handlePage(pageNum) {
                if (pageNum.target?.value) {
                    pageNum = ObjectUtils.onlyNum(pageNum.target?.value, 1);
                    if (!pageNum
                        || isNaN(pageNum)
                        || !(pageNum > 0 && pageNum <= maxPaginatorArr.value)) {
                        emit('pagination', 0);
                    } else if (pageNum !== offsetActive.value) {
                        methods.handleOffsetPaginator(null, pageNum);
                        emit('pagination', pageNum - 1);
                    }
                } else {
                    pageNum = ObjectUtils.onlyNum(pageNum, 0);
                    if (!pageNum
                        || isNaN(pageNum)
                        || !(pageNum >= 0 && pageNum <= maxPaginatorArr.value)) {
                        emit('pagination', 0);
                    } else if (pageNum !== offsetActive.value) {
                        methods.handleOffsetPaginator(null, pageNum);
                        emit('pagination', pageNum - 1);
                    }
                }

            },
            handleOffsetPaginator(direction, pageNum) {
                if (pageNum) {
                    paginationArr.value.forEach((p, index) => {
                        p.opt.forEach((o) => {
                            if (o == pageNum) {
                                indexPaginatorOffset.value = index;
                            }
                        })
                    });
                    showPaginatorArr.value = paginationArr.value[indexPaginatorOffset.value]?.opt ?? [];
                }
                else if ((direction === -1 && !showPaginatorArr.value?.includes(1)) ||
                    (direction === 1 && !paginationArr.value[paginationArr.value?.length - 1]?.opt?.includes(showPaginatorArr.value[showPaginatorArr.value?.length - 1]))) {
                    indexPaginatorOffset.value = indexPaginatorOffset.value + direction;
                    showPaginatorArr.value = paginationArr.value[indexPaginatorOffset.value]?.opt ?? [];
                }
            },
            generatePaginator() {
                if (optionsPagination.value?.offsetOptions?.length > 0) {
                    let opt = [];
                    let optAux = 0;
                    paginationArr.value = [];
                    optionsPagination.value?.offsetOptions.forEach((item, index) => {
                        opt.push(item);
                        optAux++;
                        if (opt.length > 4 || (optAux == optionsPagination.value?.offsetOptions?.length)) {
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
            maxPaginatorArr,
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
<style scoped>
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
    border-radius: 6px;
    background-color: var(--decoration-primary);
}

.paginator-item.active:hover {
    background-color: var(--decoration-primary-after);
}

.g-button {
    height: unset;
    flex: 1;
}

input[type="text"] {
    border: none;
    line-height: 2em;
    font-size: 10pt;
    width: 2em;
    text-align: center;
    background-color: var(--decoration-primary) !important;
}

input[type="text"]:hover {
    background-color: var(--decoration-primary-after) !important;
}

input[type="text"]:focus-visible {
    outline: none;
    border: none;
}

input[type="text"]::selection {
    background-color: var(--fixed-dark-mode-secondary);
    color: var(--decoration-primary);
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
    opacity: 0.3;
    pointer-events: none;
}

.resume {
    padding: 15px 0;
    gap: 15px;
    font-size: small;
    color: var(--switch-elements-mode-tertiary);
}
</style>