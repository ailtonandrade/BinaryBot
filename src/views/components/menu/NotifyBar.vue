<template>
  <div :class="{ 'notify-bar': true, 'show': showHide }">
    <div class="col-lg-4 col-md-6 col-sm-6 ml-auto  pt-3 d-flex flex-column notify-box-filter">
      <div class="col-12 d-flex">
        <label class="switch mx-1 d-flex justify-content-start ">
          <input id="form-checkbox-1" max-length="100" type="checkbox" v-model="filter.showDeletedNotifications" class="mx-1"
            @change="filterNotifications()" />
          <span class="slider round"></span>
        </label>
        <span class="notify-box-filter-label small">
          Visualizar notificações excluídas.
        </span>
      </div>
      <div class="col-12 form-control">
        <input id="form-search-1" placeholder="Busque: 'novidades', 'documentos' ..." type="text"
          v-model="filter.content" class="form-control" @input="filterNotifications()" @keydown.enter="handleSerarchInput()"/>
      </div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-6 ml-auto notify-box">
      <div v-if="notifications?.length == 0">
        <div class="col-12 p-1 b-shadow-1 notify-empty mt-1">
          <div class="flex-row notify-box-elements-dt-visualized align-center">
          </div>
          <div class="notify-box-elements-data d-flex align-center text-center">
            <h5>Nenhuma notificação por enquanto :'(</h5>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="(item, index) in notifications" :key="index">
          <div class="col-12 p-1 mt-1 b-shadow-1 notify-box-element" :class="{ 'visualized': item.visualized }">
            <div class="flex-row notify-box-elements-dt-visualized align-center">
              <div class="col-1">
                <div class="notify-box-element-visualized"></div>
              </div>
              <div class="col-3">
                <div class="notify-box-element-dt">
                  {{ item.dt_creation }}
                </div>
              </div>
              <div v-if="!item.dt_delete" class="col-8 d-flex justify-content-end">
                <div class="col-1 notify-box-trash">
                  <div class="notify-box-trash-icon" @click="deleteNotify(item)">
                    <font-awesome-icon class="btn-nav-icon" icon="fa-regular fa-trash-alt" size="1x" />
                  </div>
                </div>
              </div>
              <div v-else class="col-8 notify-box-deleted">
                <span>Excluido em: {{ item.dt_deleteFormated }}</span>
              </div>
            </div>
            <div class="notify-box-elements-data" @click="handleNotify(item)"
            :title="item.url">
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
import { getGlobalThis } from "@microsoft/signalr/dist/esm/Utils";

export default {
  name: "NotifyBar",
  props: ['showHide'],
  setup(props, { emit }) {
    var token = ref(ObjectUtils.encode(localStorage.getItem('token')));
    var socket = new WebSocket(process.env.VUE_APP_API_WEBSOCKET + `notifications?clientId=${token.value}`);

    const router = useRouter();
    const moment = inject("moment");
    const notifications = ref([]);
    const maxTextLength = ref(60);
    const tryReconnect = ref(500);
    const newNotifyQtd = inject('newNotifyQtd');
    const checkedNotify = inject("checkedNotify");
    const filter = ref({
      showDeletedNotifications: false,
      content: null
    });
    const methods = reactive({
      connectWebSocket() {
        socket.onopen = (event) => {
          console.log("Connection established.")
          methods.send('get-notify', null, filter.value);
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
              methods.send('get-notify', null, filter.value);
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
              dt_delete: d.dt_delete,
              dt_deleteFormated: d.dt_delete ? moment(d.dt_delete).format('DD/MM/YYYY, HH:mm') : null,
              title: methods.formatTextNotification(d.title),
              subtitle: methods.formatTextNotification(d.subtitle),
              message: methods.formatTextNotification(d.message),
              url: d.url,
              visualized: d.visualized
            };
            notifications.value.push(obj);
          })
        } else if (typeof dataList === 'object') {
          notifications.value.unshift({
            id: dataList.id,
            dt_creation: DateUtils.formatToAgo(dataList.dt_creation),
            dt_visualized: dataList.dt_visualized,
            dt_delete: null,
            title: methods.formatTextNotification(dataList.title),
            subtitle: methods.formatTextNotification(dataList.subtitle),
            message: methods.formatTextNotification(dataList.message),
            url: dataList.url,
            visualized: dataList.visualized
          });
          checkedNotify.value = false;
        }
      },
      send(message, data, filter) {
        const messageObject = {
          message: message,
          clientId: token.value,
          data: data,
          filter: filter
        };
        socket.send(JSON.stringify(messageObject));
      },
      handleSerarchInput(){
        document.getElementById('form-search-1').blur();
      },
      formatTextNotification(text) {
        return text.length > maxTextLength.value ? text.substring(0, maxTextLength.value) + "..." : text;
      },
      filterNotifications() {
        let canFilter = true;

        if((filter.value?.content?.length > 0 && filter.value?.content?.length < 3) || filter.value?.content?.length > 100){
          canFilter = false;
        }

        if(canFilter){
          methods.send('get-notify', null, filter.value);
        }
      },
      handleNotify(notify) {
        let aux = -1;
        notifications.value.forEach((n, index) => {
          if (n.id === notify.id) {
            aux = index;
          }
        });

        if (aux !== -1) {
          methods.send('update-notify', notifications.value[aux], filter.value);
          newNotifyQtd.value = notifications.value.filter(n => !n.visualized).length;
        }

        if(notify.url){
          if(notify.url.includes("http")){
            window.open(notify.url, '_blank');
          }else{
            router.push(notify.url);
          }
        }
      },
      deleteNotify(notify) {
        let aux = -1;
        notifications.value.forEach((n, index) => {
          if (n.id === notify.id) {
            aux = index;
          }
        });

        if (aux !== -1) {
          methods.send('delete-notify', notifications.value[aux], filter.value);
        }
      },
    });

    onMounted(async () => {
      methods.connectWebSocket();
    })

    onBeforeUnmount(() => {
      socket.close(3001, 'Logout user.');
    });

    return {
      filter,
      router,
      tryReconnect,
      newNotifyQtd,
      checkedNotify,
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
  width: 8px;
}

.notify-box::-webkit-scrollbar-thumb {
  background-color: var(--decoration-primary);
  /* Cor do polegar (a parte móvel) */
  border-radius: 10px;
  /* Borda arredondada */
}

.notify-box-element {
  background-color: var(--switch-mode-primary);
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
  cursor: pointer;
}

.notify-box-element-subtitle {
  font-weight: 600;
  font-size: small;
  cursor: pointer;
}

.notify-box-element-message {
  font-weight: 100;
  font-size: smaller;
  cursor: pointer;
}

.notify-box-trash {
  display: flex;
  justify-content: center;
  cursor: pointer;
  background-color: var(--switch-mode-tertiary);
  color: var(--switch-elements-mode-secondary);
  border-radius: 5px;
  transition: 0.2s;
}

.notify-box-trash:hover {
  background-color: var(--decoration-primary);
  color: var(--switch-mode-secondary);
  border-radius: 5px;
}

.notify-box-deleted {
  display: flex;
  justify-content: end;
  font-size: 8pt;
}

.notify-box-filter {
  position: fixed;
  z-index: 2;
  background-color: var(--switch-mode-tertiary);
}

.notify-box-filter-label {
  color: var(--switch-elements-mode-secondary);
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