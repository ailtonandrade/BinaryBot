<template>
    <div :id="'options-group' + id">
        <font-awesome-icon class="f-icon-menu" :class="{ 'active': handleOptions }" :icon="'fa-' + icon"
            @click="handle($event)" />
        <div class="backdrop-options" :class="{ 'active': handleOptions }" @click="closeMenu()"></div>
        <div :id="'options-group'" class="options-group b-shadow-1">
            <div v-for="(option, index) in options" :key="index" class="" @click="enjoyAction(option)">
                <div v-if="option.disabled === false" class="options-btn-group">
                    <button class="options-btn" :alt="option.label">
                        <font-awesome-icon class="f-icon" :icon="option.icon" />
                    </button>
                    <label>{{ option.label }}</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs, ref, inject, computed, onUpdated, watch } from "vue";

export default ({
    props: ["options", "icon", "id"],
    emits: ["enjoyAction"],
    components: {},
    name: "OptionsMenu",
    setup(props, { emit }) {
        const handleOptions = ref(false);
        const icon = ref(props.icon)
        const id = ref(props.id)
        const methods = reactive({
            handle(event) {
                handleOptions.value = true;
                if (handleOptions.value) {
                    let mainElement = document.getElementById("options-group" + id.value);
                    let elementMenu = mainElement.children[2]
                    let mouseX = event.pageX;
                    let mouseY = event.pageY;
                    let maxWidth = window.innerWidth;
                    let maxHeight = window.innerHeight;

                    let offsetX = mouseX < (maxWidth / 4 * 3) ? mouseX : mouseX - 150;
                    let offsetY = mouseY < (maxHeight / 4 * 3) ? mouseY : mouseY - 80;

                    elementMenu.style.position = 'fixed';
                    elementMenu.style.left = `${Math.min(offsetX, maxWidth - elementMenu.offsetWidth)}px`;
                    elementMenu.style.top = `${Math.min(offsetY, maxHeight - elementMenu.offsetHeight)}px`;
                    elementMenu.style.display = 'block';
                    mainElement.children[1].style.display = 'block'
                } else {
                    methods.closeMenu();
                }
            },
            enjoyAction(option) {
                emit("enjoyAction", option);
                methods.closeMenu();
            },
            closeMenu() {
                let mainElement = document.getElementById("options-group" + id.value);
                mainElement.children[1].style.display = 'none';
                mainElement.children[2].style.display = 'none';
                handleOptions.value = false;
            }
        });


        return {
            icon,
            id,
            handleOptions,
            ...toRefs(methods)
        };
    }


})
</script>
<style scoped>
.f-icon-menu {
    border-radius: 100%;
    border-width: 5px;
    padding: 10px;
    cursor: pointer;
    color: var(--decoration-primary);
    background-color: var(--switch-mode-secondary);
    border-color: var(--switch-mode-secondary);
    transition: 0.2s;
}

.f-icon-menu:hover {
    color: var(--decoration-primary-after);
    background-color: var(--switch-mode-tertiary);
    border-color: var(--switch-mode-tertiary);
    transition: 0.2s;
}

.f-icon-menu.active {
    background-color: var(--switch-mode-tertiary);
    border-style: solid;
    transition: 0.2s;
}

.options-group {
    position: fixed;
    display: none;
    padding: 5px;
    border-radius: 5px;
    max-height: 110px;
    overflow-y: scroll;
    background-color: var(--switch-mode-primary);
    z-index: 10;
    user-select: none;
}

.options-btn-group {
    background-color: var(--switch-mode-primary);
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

.options-btn-group label {
    margin: 0;
    padding-left: 5px;
    cursor: pointer;
    font-size: 7pt;
}

.options-btn {
    cursor: pointer;
    border-radius: 5px;
    height: 30px;
    width: 30px;
    color: var(--switch-mode-elements-secondary);
    background-color: var(--switch-mode-secondary);
    border-style: none;
    outline: none;

}

.options-group::-webkit-scrollbar {
    width: 8px;
}

.options-group::-webkit-scrollbar-thumb {
    background-color: var(--decoration-primary);
    /* Cor do polegar (a parte móvel) */
    border-radius: 10px;
    /* Borda arredondada */
}
</style>