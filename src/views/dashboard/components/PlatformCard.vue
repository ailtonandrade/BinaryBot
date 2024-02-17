<template>
    <!-- show array -->
    <div v-for="(p, index) in platforms" :key=index class="b-content">
        <div class="b-card b-row-center">
            <div class="b-row-start align-top">
                <div class="m-3">
                    <button class="b-btn-platform">
                        <img :src="'../../../../assets/img/' + p.namePlatform + '.png'" alt="">
                    </button>
                </div>
                <div class="b-column-start">
                    <div class="b-card">
                        <div class="b-column-start m-1">
                            <div class="b-description m-1">
                                <b>Usuário: </b>
                                <span>{{ p.userAccount }}</span>
                            </div>
                            <div class="b-row-center m-1">
                                <div class="b-description m-1">
                                    <b>Plataforma: </b>
                                    <span>{{ p.namePlatform }}</span>
                                </div>
                                <div class="b-description m-1">
                                    <b>Tipo de Conta: </b>
                                    <span>{{ p.idAccount }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="b-card m-2">
                        <div class="b-description m-1">
                            <b>Balanço: </b>
                            <span>{{ p.balanceAccount }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <button class="w-100 b-btn-action">
                Negociar
            </button>
        </div>
    </div>
    <!-- add -->
    <div class="b-content">
        <div class="b-card b-column-start">
            <div class="b-row-start align-top">
                <div class="m-3">
                    <button disabled class="b-btn-platform-empty">
                    </button>
                </div>
                <div class="b-column-start">
                    <div class="b-column-empty">
                        <div class="b-description-empty m-1">
                        </div>
                        <div class="b-description-empty-info m-1">
                        </div>
                        <div class="b-description-empty-info m-1">
                        </div>
                    </div>
                    <div class="b-description-empty-info m-1">
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <button class="w-100 b-btn-action-empty">
                <font-awesome-icon icon="fa-solid fa-plus" @click="openAddPlatform()" />
            </button>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs, onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { faLongArrowRight } from "@fortawesome/free-solid-svg-icons";


export default {
    name: "PlatformCard",
    props: {
        platforms: Array
    },
    components: {
    },
    setup(props) {
        const router = useRouter();
        const response = ref();
        const openModalCustom = inject("openModalCustom");
        const configModalAddPlatform = ref({
            reference: "addPlatform",
            title: "Adicionar Plataforma",
            icon: "plus",
            message: "",
            action: "",
            description: "",
        })
        const methods = reactive({
            openAddPlatform() {
                openModalCustom(configModalAddPlatform.value)
            },
        });

        onMounted(() => {
        });


        return {
            response,
            openModalCustom,
            configModalAddPlatform,
            ...toRefs(methods),
        };
    },
};
</script>
<style scoped>
</style>