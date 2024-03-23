<template>
    <div class="col-12 col-sm-6 px-0 d-flex">
        <div class="th-options d-flex justify-content-center align-items-center" :class="{ 'active': handleOptions }"
            @click="toggleOptions()">
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
                <input id="valueHeaderFilter" class="col-12 px-0 mx-0" type="text" placeholder="abc..."
                    v-model="filter.search" />
            </div>
            <div class="col-2 f-trash-icon d-flex justify-content-center"
                :class="filter.search ? 'd-block' : 'd-invisible'" @click="clearSearch()">
                <font-awesome-icon :icon="'fa-regular fa-trash-alt'" />
            </div>
        </div>
        <button class="btn search-f-icon" :disabled="!filter.search" @click="searchList()">
            <font-awesome-icon :icon="'fa-solid fa-search'" />
        </button>
    </div>
</template>
<script>
import { reactive, toRefs, ref, inject } from "vue";

export default ({
    props: ["options"],
    emits: [],
    components: {},
    name: "FilterSearch",
    setup(props, { emit }) {
        const handleOptions = inject("handleOptions");
        const toggleOptions = inject("toggleOptions");
        const clearSearch = inject("clearSearch");
        const searchList = inject("searchList");
        const action = inject("action");
        const filter = inject("filter");
        const methods = reactive({

        });

        return {
            handleOptions,
            toggleOptions,
            clearSearch,
            searchList,
            action,
            filter,
            ...toRefs(methods)
        };
    }


})
</script>
<style>
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

.search-input input[type="text"] {
    border-style: none;
    outline: none;
    font-size: 9pt;
    background-color: var(--switch-mode-primary) !important;
}

.f-trash-icon {
    cursor: pointer;
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
    width: 200px;
    max-height: 130px;
    min-height: 30px;
    opacity: 1;
}

.options-btn-group {
    display: flex;
    justify-content: start;
    align-items: center;
    cursor: pointer;
    width: 170px;
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

.search {
    background-color: var(--switch-mode-primary);
}
</style>