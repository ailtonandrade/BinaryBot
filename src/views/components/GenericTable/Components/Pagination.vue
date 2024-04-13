<template>
    <div class="row">
        <div class="col-3">
            <select v-model="optionsPagination.limit" @change="handleLimitOptions()">
                <option v-for="(option, index) in optionsPagination.limitOptions" :key="index" :value="option">{{ option }}</option>
            </select>
        </div>
        <div class="col-9">
        </div>
    </div>
</template>
<script>
import { reactive, toRefs, ref, computed, inject } from "vue";

export default ({
    props: ["optionsPagination", 'objContents'],
    emits: ["pagination"],
    components: {},
    name: "Pagination",
    setup(props, { emit }) {
        const handleMaxItems = computed(() => {
            let options = [];
            let totalSize = props.optionsPagination?.maxItems ?? 0;
            // Calcular a quantidade de itens por página
            const itemsPerPage = totalSize != 0 ? Math.round(totalSize / 10) : 0;

            // Adicionar opções com base na quantidade de itens por página
            if (totalSize !== 0) {
                for (let i = itemsPerPage; i <= totalSize; i *= 2) {
                    if (options.length < 5)
                        options.push(Math.round(i / 10) * 10);
                }
                options.pop();
                options.push(props.optionsPagination?.maxItems);
            }
            props.optionsPagination.limit = options[0] ?? 0;
            return options;
        })
        const methods = reactive({
            handleLimitOptions(){
            console.log("optionsPagination");
            console.log(props.optionsPagination.limit);
                emit("pagination", props.optionsPagination);
            }
        });

        return {
            handleMaxItems,
            ...toRefs(methods)
        };
    }


})
</script>
<style></style>