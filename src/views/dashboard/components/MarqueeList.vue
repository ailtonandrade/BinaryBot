<template>
  <div class="b-marquee">
    <ul @mouseleave="blur()" @mouseenter="focus()" class="b-marquee-list" id="marquee-list">
      <li>EUR/USD</li>
      <li>EUR/JPY</li>
      <li>BTC/USD</li>
      <li>GBP/USD</li>
      <li>AUD/EUR</li>
    </ul>
  </div>
</template>
<script>
import { reactive, toRefs, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Auxiliar from "@/global/auxiliar";

export default {
  setup() {
    const router = useRouter();
    const marqueeList = ref(null);

    const methods = reactive({
      focus() {
        Auxiliar.pauseMarqueeAnimation("marquee-list"); // Pausar a animação de marquee
      },
      blur() {
        Auxiliar.startMarqueeAnimation("marquee-list"); // Iniciar a animação de marquee
      },
    });

    return {
      ...toRefs(methods),
    };
  },
};
</script>