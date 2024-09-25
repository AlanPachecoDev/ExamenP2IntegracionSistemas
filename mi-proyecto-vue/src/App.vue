<script setup>
import { ref } from 'vue';
import SistemaCompras from './components/SistemaCompras.vue';
import SistemaFacturacion from './components/SistemaFacturacion.vue';

const componenteActual = ref(null);

function mostrarSistemaCompras() {
  componenteActual.value = 'compras';
}

function mostrarSistemaFacturacion() {
  componenteActual.value = 'facturacion';
}
</script>

<template>
  <div>
    <button @click="mostrarSistemaCompras">Sistema de Órdenes de Compra</button>
    <button @click="mostrarSistemaFacturacion">Sistema de Facturación</button>
    <div v-if="componenteActual === 'compras'">
      <SistemaCompras />
    </div>
    <div v-if="componenteActual === 'facturacion'">
      <SistemaFacturacion />
    </div>
  </div>
</template>

<style scoped>
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
