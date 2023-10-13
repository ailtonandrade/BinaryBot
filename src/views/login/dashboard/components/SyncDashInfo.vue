<template></template>

<script>
import { ref, onMounted, onUnmounted, reactive, toRefs } from "vue";
import ws from './../../../../services/ws';

export default {
  name: "SyncDashInfo",
  setup() {
    const data = ref({
      message: "syncDashInfo",
      obj: { name: "123" }
    });
    const response = ref(null);
    const intervalIdsyncDashInfo = ref();

    async function syncDashInfo() {
      try {
        let result = await ws.sendMessage(data.value.message, data.value.obj);
        response.value = result;
        console.log(result);
      }
      catch (error) {
        console.error("Sync error: Tentando reconectar em alguns segundos...");

        clearInterval(intervalIdsyncDashInfo.value);
        intervalIdsyncDashInfo.value = setInterval(syncDashInfo, 15000);
      }
    }

    onMounted(() => {
      intervalIdsyncDashInfo.value = setInterval(syncDashInfo, 2000);
    });

    onUnmounted(() => {
      clearInterval(intervalIdsyncDashInfo.value);
    });

    return {
      response,
    };
  },
};
</script>
