<template>
  <soan style="color:white">PUSH</soan>
</template>

<script>
import { ref, onMounted, onUnmounted, reactive, toRefs } from "vue";
import ws from './../../services/ws';

export default {
  name: "SyncNotify",
  setup() {
    const response = ref(null);
    const intervalIdSyncNotify = ref();

    async function SyncNotify() {
      try {
        let result = await ws.sendMessage("sync-notify-push", localStorage.getItem('token'));
        response.value = result;
        console.log(result);
      }
      catch (error) {
        console.error("Sync error: Tentando reconectar em alguns segundos...");

        clearInterval(intervalIdSyncNotify.value);
        intervalIdSyncNotify.value = setInterval(SyncNotify, 15000);
      }
    }

    onMounted(() => {
      intervalIdSyncNotify.value = setInterval(SyncNotify, 2000);
    });

    onUnmounted(() => {
      clearInterval(intervalIdSyncNotify.value);
    });

    return {
      response,
      intervalIdSyncNotify
    };
  },
};
</script>
