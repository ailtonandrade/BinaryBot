<template>
  <div class="col-12">
    <div class="board-content">
      <span>admin board</span>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const methods = reactive({
    });

    return {
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
.board-content {
  color: var(--switch-elements-mode-secondary);
  background-color: var(--switch-mode-primary);
}
</style>