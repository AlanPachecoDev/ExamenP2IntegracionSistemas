<template>
    <div>
      <h1>Sistema de Facturación</h1>
      <form @submit.prevent="generarFactura">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" required>
        <br><br>
        <label for="cedula">Cédula:</label>
        <input type="text" id="cedula" v-model="cedula" required>
        <br><br>
        <label for="idOrdenCompra">ID Orden de Compra:</label>
        <input type="number" id="idOrdenCompra" v-model.number="idOrdenCompra" required>
        <br><br>
        <button type="submit">Generar factura</button>
      </form>
  
      <div v-if="mostrarFactura">
        <h2>Factura</h2>
        <p><strong>Nombre:</strong> {{ nombre }}</p>
        <p><strong>Cédula:</strong> {{ cedula }}</p>
        <p v-if="ordenCompra">
          <strong>ID Orden de Compra:</strong> {{ ordenCompra.ID }}
          <br>
          <strong>Producto:</strong> {{ producto.Nombre }}
          <br>
          <strong>Descripción:</strong> {{ producto.Descripcion }}
          <br>
          <strong>Cantidad:</strong> {{ ordenCompra.Cantidad }}
          <br>
          <strong>Precio Unitario:</strong> ${{ ordenCompra.PrecioUnitario }}
          <br>
          <strong>Total:</strong> ${{ ordenCompra.PrecioUnitario * ordenCompra.Cantidad }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const nombre = ref('');
  const cedula = ref('');
  const idOrdenCompra = ref(null);
  const ordenCompra = ref(null);
  const producto = ref(null);
  const mostrarFactura = ref(false);
  
  const generarFactura = async () => {
    try {
      // Obtener la orden de compra
      const responseOrden = await axios.get(`http://localhost:3001/api/compras/ordenes-compra/${idOrdenCompra.value}`);
      ordenCompra.value = responseOrden.data;
  
      // Obtener información completa del producto asociado a la orden de compra
      const responseProducto = await axios.get(`http://localhost:3001/api/inventarios/productos/${ordenCompra.value.IDProducto}`);
      producto.value = responseProducto.data;
  
      mostrarFactura.value = true;
  
      // Enviar la factura a la base de datos
      const factura = {
        NombreCliente: nombre.value,
        CedulaCliente: cedula.value,
        NombreProducto: producto.value.Nombre,
        DescripcionProducto: producto.value.Descripcion,
        Precio: ordenCompra.value.PrecioUnitario,
        Cantidad: ordenCompra.value.Cantidad,
        Subtotal: ordenCompra.value.PrecioUnitario * ordenCompra.value.Cantidad
      };
  
      const responseFactura = await axios.post('http://localhost:3001/api/inventarios/facturas', factura);
      console.log('Factura enviada a la base de datos:', responseFactura.data);
    } catch (error) {
      console.error('Error al generar la factura:', error);
      alert('No se pudo encontrar la orden de compra. Verifica el ID e intenta nuevamente.');
    }
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  form {
    margin-bottom: 20px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    margin-bottom: 10px;
  }
  button {
    cursor: pointer;
  }
  </style>
  