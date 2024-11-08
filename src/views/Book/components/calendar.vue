<template>
    <div class="col-12">
        <DatePicker id="datepicker-24h" showTime hourFormat="24" fluid v-model="pageConfig.selectedDate" inline showWeek
            class="w-full calendar-custom" @click="handleSelectedDate()" :showIcon="true"
            placeholder="Selecione uma data" showButtonBar />
    </div>
</template>
<script>
import { ref, onMounted, onUpdated, computed, reactive, toRefs, inject, provide } from "vue";
import DatePicker from 'primevue/datepicker';
import moment from 'moment';

export default {
    name: "Calendar",
    components: { DatePicker },
    setup() {
        const pageConfig = inject("pageConfig");
        const pageForm = inject("pageForm");
        const methods = reactive({
            handleSelectedDate() {
                methods.truncMinutes();
                methods.toggleSelected();
                let date = pageConfig.value.selectedDate ? moment(pageConfig.value.selectedDate).format('DD/MM/YYYY HH:00:00') : null;
                pageConfig.value.selectedDateFmt = date;
                pageForm.value.selectedDate = date;
                console.log("Data selecionada:", date);
            },
            truncMinutes() {
                const elem = document.querySelectorAll(".p-datepicker-minute-picker");
                if (elem[0]?.children) {
                    elem[0].children[0].disabled = true;
                    elem[0].children[1].innerHTML = '00';
                    elem[0].children[2].disabled = true;
                }
            },
            toggleSelected() {
                const elem = document.querySelectorAll("p-datepicker-day-selected");
                console.log(elem)
            }
        })

        onMounted(() => {
            methods.truncMinutes();
            methods.toggleSelected();
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

.calendar-custom {
    border-radius: 10px;
    padding: 10px;
    margin: 5px 0;
    background-color: var(--switch-mode-tertiary);
}

.card-custom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: -20px;
    margin-left: 0px;
    padding: 50px 20px;
    text-align: justify;
    border-radius: 10px;
    background-color: var(--switch-mode-tertiary);
}
</style>