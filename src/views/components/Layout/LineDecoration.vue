<template>
  <div class="line-decoration">
    <span class="line-pointer"></span>
    <span class="line"></span>
  </div>
</template>
<script>
import { computed, watch, reactive, toRefs, ref, inject, onMounted } from "vue";
export default ({
  name: "LineDecoration",
  setup() {
    return {
    };
  },
});
</script>
<style scoped>
.line {
  width: 98%;
  height: 1px;
  background-color: var(--decoration-primary);
}

.line-pointer {
  width: 1%;
  height: 1px;
  transform: rotate(45deg);
  border-color: var(--decoration-primary);
  border-style: solid;
  border-width: 0px 1px 1px 0px;
}

.line-decoration {
  display: flex;
  width: 100%;
  height: 10px;
  margin: 5px 0 10px 0;
}
</style>


