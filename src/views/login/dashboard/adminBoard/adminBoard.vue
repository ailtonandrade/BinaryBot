<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <span>admin board</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
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
nav {
  width: 100vw;
}

button:hover {
  border-color: white;
}

.nav-btn-row {
  display: flex;
  justify-content: flex-end;
}

.btn-nav {
  color: white;
  text-decoration: none;
}

.btn-nav:hover {
  opacity: 0.8;
}</style>