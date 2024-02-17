<template>
  <div :class="{ 'notify-bar': true, 'show': showHide }">
    <div class="col-lg-4 col-md-6 col-sm-6 ml-auto notify-box">
      <div v-if="notifications?.length == 0">
        <div class="col-12 p-1 b-shadow-1 notify-empty">
          <div class="flex-row notify-box-elements-dt-visualized align-center">
          </div>
          <div class="notify-box-elements-data d-flex align-center text-center">
            <h5>Nenhuma notificação por enquanto :'(</h5>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="(item, index) in notifications" :key="index">
          <div class="col-12 p-1 b-shadow-1 notify-box-element" :class="{ 'visualized': item.visualized }"
            @click="handleNotify(item)">
            <div class="flex-row notify-box-elements-dt-visualized align-center">
              <div class="col-1">
                <div class="notify-box-element-visualized"></div>
              </div>
              <div class="col-11">
                <div class="notify-box-element-dt">
                  {{ item.dt_creation }}
                </div>
              </div>
            </div>
            <div class="notify-box-elements-data">
              <div class="notify-box-element-title">
                {{ item.title }}
              </div>
              <div class="notify-box-element-subtitle">
                {{ item.subtitle }}
              </div>
              <div class="notify-box-element-message">
                {{ item.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, toRefs, reactive, ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useRouter } from "vue-router";
import DateUtils from '@/Utils/DateUtils.js';
import ObjectUtils from '@/Utils/ObjectUtils.js';
import { webSocketRequestEnum } from '@/enums/webSocketRequestEnum.js';

export default {
  name: "NotifyBar",
  props: ['showHide'],
  setup(props, { emit }) {
    var token = ref(ObjectUtils.encode(localStorage.getItem('token')));
    var socket = new WebSocket(process.env.VUE_APP_API_WEBSOCKET + `notifications?clientId=${token.value}`);

    const router = useRouter();
    const notifications = ref([]);
    const maxTextLength = ref(60);
    const tryReconnect = ref(500);
    const newNotifyQtd = ref(inject('newNotifyQtd'));
    const methods = reactive({
      connectWebSocket() {
        socket.onopen = (event) => {
          console.log("Connection established.")
          methods.send('get-notify', null);
        }

        socket.onclose = (event) => {
          if (event?.code != 3010) {
            methods.reconnectWebSocket();
          }
        }

        socket.onmessage = (event) => {
          let response = JSON.parse(event.data);
          if (response?.request == webSocketRequestEnum.HANDLE_NOTIFY) {
            methods.responseTable(JSON.parse(response?.dataList));
            emit('notify-data-list', notifications.value);
          }
        };
      },
      reconnectWebSocket() {
        if (socket.readyState == WebSocket.CLOSED) {
          setTimeout(() => {
            socket = new WebSocket(process.env.VUE_APP_API_WEBSOCKET + `notifications?clientId=${token.value}`);
            socket.onerror = () => {
              console.log("Reconnecting...");
              methods.reconnectWebSocket();
            };

            socket.onopen = (event) => {
              console.log("Reconnected.")
              methods.send('get-notify', null);
            }

          }, tryReconnect.value
          );
        }
      },
      responseTable(dataList) {
        if (Array.isArray(dataList)) {
          notifications.value = [];
          dataList.forEach((d) => {
            let obj = {
              id: d.id,
              dt_creation: DateUtils.formatToAgo(d.dt_creation),
              dt_visualized: d.dt_visualized,
              title: methods.formatTextNotification(d.title),
              subtitle: methods.formatTextNotification(d.subtitle),
              message: methods.formatTextNotification(d.message),
              url: d.url,
              visualized: d.visualized
            };
            notifications.value.push(obj);
          })
        } else if (typeof dataList === 'object') {
          notifications.value.push({
            id: dataList.id,
            dt_creation: DateUtils.formatToAgo(dataList.dt_creation),
            dt_visualized: dataList.dt_visualized,
            title: methods.formatTextNotification(dataList.title),
            subtitle: methods.formatTextNotification(dataList.subtitle),
            message: methods.formatTextNotification(dataList.message),
            url: dataList.url,
            visualized: dataList.visualized
          });
        }
      },
      send(message, data) {
        const messageObject = {
          message: message,
          clientId: token.value,
          data: data
        };
        socket.send(JSON.stringify(messageObject));
      },
      formatTextNotification(text) {
        return text.length > maxTextLength.value ? text.substring(0, maxTextLength.value) + "..." : text;
      },
      handleNotify(notify) {
        let aux = -1;
        notifications.value.forEach((n, index) => {
          if (n.id === notify.id) {
            aux = index;
          }
        });

        if (aux !== -1) {
          notifications.value[aux].visualized = true;
          notifications.value[aux].dt_visualized = DateUtils.formatJsToApi(new Date());
          methods.send('update-notify', notifications.value[aux]);
          newNotifyQtd.value = notifications.value.filter(n => !n.visualized).length;
        }
      }
    });

    onMounted(async () => {
      methods.connectWebSocket();
    })

    onBeforeUnmount(() => {
      socket.close(9010, 'Logout user.');
    });

    return {
      router,
      tryReconnect,
      newNotifyQtd,
      maxTextLength,
      notifications,
      ...toRefs(methods),
    };
  },
};
</script>

<style>
.notify-box {
  position: fixed;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 5px;
  color: var(--switch-elements-mode-secondary);
  background-color: var(--switch-mode-secondary);
  box-shadow: -1px 1px 0.1px 0.1px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.notify-box::-webkit-scrollbar {
  width: 0;
  /* Largura da barra de rolagem */
}

.notify-box-element {
  background-color: var(--switch-mode-primary);
  cursor: pointer;
  margin-bottom: 5px;
  border-radius: 5px;
  transition: 0.1s;
}

.notify-box-element:hover {
  background-color: var(--switch-mode-tertiary);
}

.notify-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  cursor: default;
  background-color: var(--switch-mode-primary);
  margin-bottom: 5px;
  border-radius: 5px;
  transition: 0.1s;
}

.notify-empty:hover {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  cursor: default;
}

.notify-box-elements-data {
  margin-top: 2px;
  padding: 5px;
  min-height: 100px;
  background-color: var(--switch-mode-secondary);
  margin-bottom: 5px;
  border-radius: 5px;
}

.notify-box-element .notify-box-elements-dt-visualized {
  background-color: var(--switch-mode-secondary);
  padding: 5px;
}

.notify-box-element-visualized {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: var(--decoration-primary);
}

.notify-box-element-dt {
  font-size: smaller;
}

.notify-box-elements-dt-visualized {
  border-radius: 5px;
}


.notify-box-element-title {
  color: var(--decoration-primary);
}

.notify-box-element-subtitle {
  font-weight: 600;
  font-size: small;
}

.notify-box-element-message {
  font-weight: 100;
  font-size: smaller;
}

/* VISUALIZED */
.notify-box-element.visualized {
  opacity: 0.5;
}

.notify-box-element.visualized .notify-box-element-title {
  color: var(--switch-elements-mode-secondary);
}

.notify-box-element.visualized .notify-box-element-visualized {
  background-color: var(--switch-elements-mode-secondary);
}
</style>