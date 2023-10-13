<template>
  <div class="b-content">
    <div class="b-card b-row-center">
      <div class="b-row-start align-top">
        <div class="m-3">
          <button class="b-btn-platform">
            IqOption
          </button>
        </div>
        <div class="b-column-start">
          <div class="b-card">
            <div class="b-column-start m-1">
              <div class="b-description m-1">
                <b>Usuário: </b>
                <span>ailtonAndrade15@gmai.com</span>
              </div>
              <div class="b-row-center m-1">
                <div class="b-description m-1">
                  <b>Plataforma: </b>
                  <span>IqOption</span>
                </div>
                <div class="b-description m-1">
                  <b>Tipo de Conta: </b>
                  <span>Real</span>
                </div>
              </div>
            </div>
          </div>
          <div class="b-card m-2">
            <div class="b-description m-1">
              <b>Balanço: </b>
              <span>R$ 1259516521,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <button class="w-100 b-btn-action">
        Negociar
      </button>
    </div>
  </div>
  <div class="b-content">
    <div class="b-card b-column-start">
      <div class="b-row-start align-top">
        <div class="m-3">
          <button class="b-btn-platform">
            IqOption
          </button>
        </div>

        <div class="b-column-start">
          <div class="b-card">
            <div class="b-column-start m-1">
              <div class="b-description m-1">
                <b>Usuário: </b>
                <span>ailtonAndrade15@gmai.com</span>
              </div>
              <div class="b-row-center m-1">
                <div class="b-description m-1">
                  <b>Plataforma: </b>
                  <span>IqOption</span>
                </div>
                <div class="b-description m-1">
                  <b>Tipo de Conta: </b>
                  <span>Demo</span>
                </div>
              </div>
            </div>
          </div>
          <div class="b-card m-2">
            <div class="b-description m-1">
              <b>Balanço: </b>
              <span>R$ 1259516521,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <button class="w-100 b-btn-action">
        Negociar
      </button>
    </div>
  </div>
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
  <SyncDashInfo></SyncDashInfo>
</template>
<script>
import { reactive, toRefs, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import SocketService from "../../../../services/SocketService";
import SyncDashInfo from "../components/SyncDashInfo.vue";
export default {
  components: {
    SyncDashInfo
  },
  setup() {
    const router = useRouter();
    const response = ref();
    const methods = reactive({
    });

    onMounted(() => {
    });


    return {
      response,
      ...toRefs(methods),
    };
  },
};
</script>
<style scoped>
@import "../../../../styles/commom.css";
@import "../../../../styles/boardLayout.css";
</style>
