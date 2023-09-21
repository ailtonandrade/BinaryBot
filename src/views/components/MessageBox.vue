<template>
  <div>
    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    isModalVisible: Boolean,
    message: String,
    buttonTitle: String,
    funcEmit: String,
  },
  setup(props) {
    const _isModalVisible = computed(() => {
      // Você pode acessar as props diretamente de forma reativa
      console.log(props.message); // Exemplo de acesso a message
      console.log(props.buttonTitle); // Exemplo de acesso a buttonTitle
      console.log(props.funcEmit); // Exemplo de acesso a funcEmit
      return props.isModalVisible;
    });
    console.log(_isModalVisible.value); // Exemplo de acesso a isModalVisible

    return {
      _isModalVisible,
    };
  },
});
</script>
<style scope>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro para destacar o modal */
  display: flex;
  justify-content: center; /* Centralizar horizontalmente */
  align-items: center; /* Centralizar verticalmente */
}

.modal-content {
  background-color: #fff; /* Cor de fundo do modal */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Sombra do modal */
  max-width: 80%; /* Largura máxima do modal */
}
</style>