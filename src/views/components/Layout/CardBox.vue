<template>
  <div class="card-box d-flex flex-column align-center justify-center">
    <div class="container-fluid d-flex flex-column align-start justify-center">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <LineDecoration></LineDecoration>
      <div class="mb-3 p-0 row breadcrumb-container">
        <div v-for="(text, index) in breadcrumb" :key="index">
          <div class="breadcrumb-content">
            <span class="breadcrumb-link smaller" @click=goToRoute(text.link)>
              {{ text.name }}
            </span>
            <b v-if="++index < breadcrumb?.length" class="breadcrumb-dot medium"> > </b>
          </div>
        </div>
      </div>
    </div>
    <div class="card-box-content container-fluid d-flex align-center justify-center">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { computed, watch, reactive, toRefs, ref, inject, onMounted } from "vue";
import LineDecoration from "./LineDecoration.vue";
import { useRouter } from "vue-router";

export default ({
  props: ['title','description','breadcrumb'],
  components: {
    LineDecoration
  },
  name: "CardBox",
  setup(props) {
    const router = useRouter();
    const methods = reactive({
      goToRoute(route) {
        if (route)
          router.goTo(route);
      }
    });


    return {
      router,
      ...toRefs(methods),
    };
  },
});
</script>
<style scoped>
.card-box {
  margin: 0 0 0 70px;
  padding: 25px 50px 20px 50px;
  background-color: var(--switch-mode-primary);
}

.card-box-content {
  padding: 10px;
  border-radius: 20px;
  box-shadow: 1px 1px 1px 1px rgb(0, 0, 0, 0.2);
  background-color: var(--switch-mode-secondary);
}

.breadcrumb-container {
  display: flex;
  flex-direction: row;
}

.breadcrumb-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.breadcrumb-link {
  margin: 0 10px 0 10px;
  padding: 10px;
  color: var(--switch-elements-mode-tertiary);
  border-radius: 10px;
  cursor: pointer;
  font-size: x-small;
  background-color: var(--switch-mode-tertiary);
  box-shadow: 1px 1px 1px 0.1px rgb(0, 0, 0, 0.2);
}

.breadcrumb-dot {
  color: var(--switch-elements-mode-tertiary);
}

h1 {
  color: var(--switch-elements-mode-primary);
}

p {
  color: var(--switch-elements-mode-primary);
}
</style>


