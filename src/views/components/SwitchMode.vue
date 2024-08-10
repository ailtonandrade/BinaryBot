<template>
  <div>

  </div>
</template>
<script>
import { computed, watch, reactive, toRefs, ref, inject, onMounted } from "vue";
export default ({
  name: "SwitchMode",
  setup() {
    const isDarkMode = ref(inject("isDarkMode"));

    const style = ref(document.documentElement.style);
    const methods = reactive({
      switchMode() {
        if (isDarkMode.value) {
          style.value.setProperty('--switch-mode-primary'           , 'rgb(22, 22, 22)');
          style.value.setProperty('--switch-mode-secondary'         , 'rgb(33, 33, 33)');
          style.value.setProperty('--switch-mode-tertiary'          , 'rgb(44, 44, 44)');
          style.value.setProperty('--switch-mode-elements-primary'  , 'rgb(240, 240, 240)');
          style.value.setProperty('--switch-mode-elements-secondary', 'rgb(210, 210, 210)');
          style.value.setProperty('--switch-mode-elements-tertiary' , 'rgb(224, 224, 224)');
        } else {
          style.value.setProperty('--switch-mode-primary'           , 'rgb(220, 220, 220)');
          style.value.setProperty('--switch-mode-secondary'         , 'rgb(210, 210, 210)');
          style.value.setProperty('--switch-mode-tertiary'          , 'rgb(200, 200, 200)');
          style.value.setProperty('--switch-mode-elements-primary'  , 'rgb(22, 22, 22)');
          style.value.setProperty('--switch-mode-elements-secondary', 'rgb(33, 33, 33)');
          style.value.setProperty('--switch-mode-elements-tertiary' , 'rgb(44, 44, 44)');
        }
      }
    });

    onMounted(() => {
      methods.switchMode();
    })
    watch(() => isDarkMode.value, (oldV, newV) => {
      if (oldV != newV) {
        methods.switchMode();
      }
    })
    return {
      style,
      isDarkMode,
      ...toRefs(methods),
    };
  },
});
</script>
<style scoped></style>


