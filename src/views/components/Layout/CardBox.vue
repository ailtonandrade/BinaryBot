<template>
  <div class="card-box d-flex flex-column align-center justify-center">
    <div class="container-fluid d-flex flex-column align-start justify-center">
      <h4>{{ title }}</h4>
      <p class="small">{{ description }}</p>
      <LineDecoration></LineDecoration>
      <div class="mb-3 p-0 row breadcrumb-container">
        <div v-for="(text, index) in breadcrumb" :key="index">
          <div class="breadcrumb-content">
            <span class="breadcrumb-link" @click=goToRoute(text.link)>
              {{ text.name }}
            </span>
            <b v-if="++index < breadcrumb?.length" class="breadcrumb-dot medium"> - </b>
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
  margin: 0 70px 0 5px;
  padding: 20px 5px 0 20px;
  background-color: var(--switch-mode-primary);
}
@media (min-width: 600px){
  .card-box{
    padding: 20px 5px 0 70px;
    overflow: hidden;
  }
}
.card-box-content {
  display: flex;
  justify-content: center;
  padding: 10px 0px;
  border-radius: 20px;
  box-shadow: 1px 1px 1px 1px rgb(0, 0, 0, 0.2);
  background-color: var(--switch-mode-secondary);
  overflow: hidden;
}

.breadcrumb-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.breadcrumb-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  margin: 0px 10px;
  padding: 0 10px;
  height:20px;
  color: var(--switch-mode-elements-tertiary);
  border-radius: 5px;
  cursor: pointer;
  font-size: small;
  background-color: var(--switch-mode-tertiary);
  box-shadow: 1px 1px 1px 0.1px rgb(0, 0, 0, 0.2);
}

.breadcrumb-dot {
  pointer-events:none;
  color: var(--switch-mode-elements-tertiary);
}

h1 {
  color: var(--switch-mode-elements-primary);
}

p {
  color: var(--switch-mode-elements-primary);
}

</style>


