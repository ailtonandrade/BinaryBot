<template>
  <PlatformCard :platforms="listPlatforms"></PlatformCard>
  <div class="b-content">
    <div class="b-card b-column-start">
      <div class="b-row-start align-top">
        <div class="m-3">
          <button disabled class="b-btn-platform-empty">
          </button>
        </div>
        <div class="b-column-start">
          <div class="b-column-empty">
            <div class="b-description-empty m-1">
            </div>
            <div class="b-description-empty-info m-1">
            </div>
            <div class="b-description-empty-info m-1">
            </div>
          </div>
          <div class="b-description-empty-info m-1">
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <button class="w-100 b-btn-action-empty">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PlatformCard from "../components/PlatformCard.vue";
export default {
  components: {
    PlatformCard
  },
  setup() {
    const router = useRouter();
    const response = ref();
    const listPlatforms = ref([]);
    const methods = reactive({
    });

    onMounted(() => {
    });


    return {
      response,
      listPlatforms,
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
@import "@/styles/commom.css";
@import "@/styles/boardLayout.css";
</style>
