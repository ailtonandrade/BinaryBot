
<template>
  <main>
    <router-view />
  </main>
</template>
<script lang="ts">
import { provide } from "vue";

export default {
  components :{
    
  },
  setup() {

    return {

    }
  }
}
</script>
<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
