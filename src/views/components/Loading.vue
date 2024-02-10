<template>
  <div id="loading" style="display: none;">
    <span class="loading-content">
      <i class="loading-spinner"></i>
    </span>
  </div>
</template>
<script>
import { inject, toRefs, reactive, ref, computed, onMounted } from "vue";
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
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
@import "@/styles/commom.css";

#loading {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 30;
  background-color: rgb(0, 0, 0, 0.5);
}

.loading-content {
  position: fixed;
  top: 50%;
  left: 50%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.loading-content {
  color: var(--switch-elements-mode-primary);
}

.loading-spinner {
  /* Estilo da animação de giro */
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 100%;
  border-top: 4px solid ;
  animation: spin 1s none infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}</style>