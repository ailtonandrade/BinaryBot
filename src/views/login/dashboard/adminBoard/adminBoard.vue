<template>
  <div class="board-content">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <span>admin board</span>
        </div>
      </div>
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

.board-content{
  height: 100%;
  color: var(--switch-elements-mode-secondary);
  background-color: var(--switch-mode-primary);
}
</style>