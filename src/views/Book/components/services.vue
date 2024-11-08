<template>
    <div class="col-12 grid-services">
        <div v-for="(s) in pageConfig.data.servicesList" :key="s.id" @click="handleService(s)"
            :id="'service-item-'+s.id" class="card-services d-flex b-shadow-1 m-1">
            <a class="link-services" href="https://www.instagram.com" target="_blank">
                <font-awesome-icon class="icon-service small px-2" icon="fa-solid fa-circle" />
            </a>
            <div class="separator-vert"></div>
            <span class="text-services">
                {{ s.serviceName }}
            </span>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, onUpdated, computed, reactive, toRefs, inject, provide } from "vue";
import ObjectUtils from "@/Utils/ObjectUtils";

export default {
    name: "Infos",
    setup() {
        const pageConfig = inject("pageConfig");
        const pageForm = inject("pageForm");
        const methods = reactive({
            handleService(service) {
                pageForm.value.selectedService = null;
                const elem = document.querySelectorAll('.card-services');
                if (elem) {
                    elem.forEach((el) => {
                        if (el.id == 'service-item-'+service.id && !el.classList.contains('active')) {
                            el.classList.add('active');
                            pageForm.value.selectedService = service;
                        } else {
                            el.classList.remove('active');
                        }
                    });
                }
            },
        })


        return {
            pageConfig,
            pageForm,
            ...toRefs(methods)
        }
    }

}
</script>
<style scoped>
.grid-services {
    max-height: 300px;
    overflow-y: auto;
}

.separator-line {
    width: 10%;
    height: 5px;
    margin: 10px 0;
    background-color: var(--decoration-primary);
}

.separator-vert {
    width: 2px;
    height: 100%;
    background-color: var(--switch-mode-elements-primary);
}

.title-label {
    font-weight: 600;
    font-size: large;
    color: var(--decoration-primary);
}

.card-services {
    padding: 10px;
    border-radius: 10px;
    background-color: var(--decoration-primary);
    color: var(--switch-mode-elements);
    cursor: pointer;
    transition: 0.2s;
    opacity: 0.9;
}

.card-services:hover {
    transition: 0.2s;
    opacity: 1;
}

.active {
    background-color: var(--success);
    opacity: 1;
}

.link-services {
    color: var(--switch-mode-elements-primary);
    text-decoration: none;
}

.card-services a {}

.icon-services {}

.text-services {}


::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: var(--decoration-primary-after);
    /* Cor do polegar (a parte móvel) */
    border-radius: 10px;
    /* Borda arredondada */
}

::-webkit-scrollbar-track {
    background-color: var(--switch-mode-elements-tertiary);
    /* Cor do rastro (a parte fixa) */
}
</style>