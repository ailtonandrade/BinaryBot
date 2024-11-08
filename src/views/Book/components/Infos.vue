<template>
    <div class="col-12">
        <div class="images ">
            <div class="d-flex justify-content-lg-start b-radius-5 justify-content-md-start justify-content-center">    
                <img class="img-perfil b-radius-100 b-shadow-2" :src="handleImgUser()" />
            </div>
            <div class="bg-overlay"
                :style="{
                    'background-image': `url(${handleImgCoverUser()})`,
                    'background-size': 'cover',
                    'background-position': 'center',
                    'background-repeat': 'no-repeat'
                }">
            </div>
        </div>
        <div class="card-custom">
            <span>
                Para exibir um calendário sempre visível e em modo escuro, você pode utilizar o vue3-datepicker.
                Aqui está um exemplo de como configurar o vue3-datepicker:
            </span>
            <div class="social-media">
                <a href="https://www.instagram.com" target="_blank">
                    <font-awesome-icon class="brands" icon="fa-brands fa-instagram" />
                </a>
                <a href="https://www.facebook.com" target="_blank">
                    <font-awesome-icon class="brands" icon="fa-brands fa-facebook" />
                </a>
                <a href="https://www.youtube.com" target="_blank">
                    <font-awesome-icon class="brands" icon="fa-brands fa-youtube" />
                </a>
            </div>
            <div class="bio-contact">
                <font-awesome-icon icon="fa-regular fa-map" />
                <span class="px-2">Rua São Domingos, 418 - APTO 106</span>
            </div>
            <div class="bio-contact">
                <font-awesome-icon icon="fa-solid fa-phone" />
                <span class="px-2">(13) 9 1234-5678</span>
            </div>
            <div class="bio-contact">
                <font-awesome-icon icon="fa-regular fa-envelope" />
                <span class="px-2">ailtonandrade15@gmail.com</span>
            </div>
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
        const pageDefaults = inject("pageDefaults");
        const methods = reactive({
            handleImgCoverUser() {
                const imgCoverUser = pageConfig.value.data?.imgCoverUser ?? pageDefaults.value.imgCoverUser;
                console.log("imgCoverUser")
                console.log(imgCoverUser)
                if (imgCoverUser === ObjectUtils.getImgCoverBlank()) {
                    return require(`@/assets/${imgCoverUser}`);
                }
                return ObjectUtils.getImgFromBytes(imgCoverUser);
            },
            handleImgUser() {
                const imgUser = pageConfig.value.data?.imgUser ?? pageDefaults.value.imgUser;
                console.log("imgUser")
                console.log(imgUser)
                if (imgUser === ObjectUtils.getImgBlank()) {
                    return require(`@/assets/${imgUser}`);
                }
                return ObjectUtils.getImgFromBytes(imgUser);
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
.images{
    position: relative;
}
.separator-line {
    width: 10%;
    height: 5px;
    margin: 10px 0;
    background-color: var(--decoration-primary);
}

.title-label {
    font-weight: 600;
    font-size: large;
    color: var(--decoration-primary);
}

.b-radius-100 {
    border-radius: 100%;
}

.b-shadow-2 {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.bio-contact {
    display: flex;
    align-items: center;
    padding: 1% 2%;
    margin-top: 15px;
    background-color: var(--switch-mode-tertiary);
    transition: 0.2s;
    border-radius: 15px;
    cursor: pointer;
}

.bio-contact:hover {
    background-color: var(--switch-mode-secondary);
    transition: 0.2s;
}

.img-perfil {
    position: relative;
    border-style: solid;
    border-color: var(--switch-mode-tertiary);
    border-width: 5px;
    margin-top: 20px;
    max-width: 150px;
    z-index: 2;
}

.img-cover-perfil {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.brands {
    margin-top: 30px;
    height: 25px;
    padding: 0 10px;
    color: var(--switch-mode-elements-tertiary);
    transition: 0.2s;
}

.brands:hover {
    padding: 0 10px;
    color: var(--decoration-primary);
    transition: 0.2s;
}

.card-custom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 0px;
    padding: 50px 20px;
    text-align: justify;
    border-radius: 10px;
    background-color: var(--switch-mode-tertiary);
}

.bg-overlay {
    border-radius: 10px 10px 0 0;
    margin-top: -170px;
    min-height: 150px;
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.bg-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.3;
}
</style>