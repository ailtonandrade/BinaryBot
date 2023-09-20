<template>
  <nav class="navbar-dark bg-dark">
    <div class="container">
      <div class="row">
        <div class="col-6" @click="redirectToHome">
          <a class="navbar-brand" href="#">BinaryBot</a>
        </div>
        <div class="col-6 nav-btn-row">
          <div class="btn-nav">
            <button class="" @click="logout">Sair</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { toRefs, reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const methods = reactive({
      redirectToHome() {
        router.push("/dashboard");
      },
      logout() {
        localStorage.clear();
        router.push("/");
      },
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