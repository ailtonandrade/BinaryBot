<template>
    <div class="col-12">
        <div class="form">
            <div class="form-group">
                <label for="nome" class="form-label">
                    Nome
                </label>
                <input id="nome" v-model="pageForm.nome" class="form-control" type="text" placeholder="Nome" />
            </div>
            <div class="form-group">
                <label for="telefone" class="form-label">
                    Telefone
                </label>
                <input v-model="pageForm.telefone" id="telefone" class="form-control" type="text"
                    placeholder="(11) 9 1234-5678" />
            </div>
            <div class="form-group">
                <label for="mensagem" class="form-label">
                    Mensagem
                </label>
                <textarea v-model="pageForm.mensagem" id="mensagem" class="form-control" type="text"
                    placeholder="envie sua mensagem" />
            </div>
            <div class="card-send d-flex justify-content-center b-shadow-1 m-1">
                <a class="link-services" href="https://www.instagram.com" target="_blank">
                    <font-awesome-icon class="icon-service small px-2" icon="fa-regular fa-paper-plane" />
                </a>
                <div class="separator-vert"></div>
                <span class="text-services" @click="sendMessage()">
                    Enviar pedido de Agendamento
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, onUpdated, computed, reactive, toRefs, inject, provide } from "vue";
import ObjectUtils from "@/Utils/ObjectUtils";
import BookService from "@/services/BookService";

export default {
    name: "Infos",
    setup() {
        const pageConfig = inject("pageConfig");
        const pageForm = inject("pageForm");
        const openModalBox = inject("openModalBox");
        const openModalCustom = inject("openModalCustom");
        const addMessageBox = inject("addMessageBox");
        const methods = reactive({

            sendMessage() {
                pageForm.value.idBook = pageConfig.value.id;
                console.log("enviando");
                console.log(pageForm.value);
                BookService.sendMessage(pageForm.value)
                    .then((resp) => {
                        addMessageBox(
                            "Ok...",
                            "Mensagem enviada com sucesso, aguarde o contato referente ao seu agendamento.",
                            null,
                            "success",
                            null
                        );
                    })
                    .catch((ex) => {
                        addMessageBox(
                            "Oops...",
                            "Esse book não foi encontrado.",
                            null,
                            "danger",
                            null
                        );
                    });
            },
        })


        return {
            pageConfig,
            pageForm,
            openModalBox,
            openModalCustom,
            addMessageBox,
            ...toRefs(methods)
        }
    }

}
</script>
<style scoped>
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
}

.card-services:hover {
    background-color: var(--decoration-primary-after);
    transition: 0.2s;
}

.card-send {
    padding: 10px;
    border-radius: 10px;
    background-color: var(--success);
    color: var(--switch-mode-elements-primary);
    cursor: pointer;
    transition: 0.2s;
    opacity: 0.8;
}

.card-send:hover {
    background-color: var(--success);
    transition: 0.2s;
    opacity: 1;
}

.link-services {
    color: var(--switch-mode-elements-primary);
    text-decoration: none;
}

.card-services a {}

.icon-services {}

.text-services {}
</style>