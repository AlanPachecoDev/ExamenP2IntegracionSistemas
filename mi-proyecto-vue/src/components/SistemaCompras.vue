<template>
    <div>
      <h1>Sistema de Órdenes de Compra</h1>
      <ul>
        <li v-for="producto in productos" :key="producto.ID">
          <h2>{{ producto.Nombre }}</h2>
          <img :src="producto.imagen" alt="Imagen del Pokémon" v-if="producto.imagen">
          <p>{{ producto.Descripcion }}</p>
          <p>Precio: ${{ producto.Precio }}</p>
          <label>Cantidad:</label>
          <input type="number" v-model.number="producto.cantidad" />
          <button @click="agregarAlCarrito(producto)">Agregar al carrito</button>
        </li>
      </ul>
  
      <!-- Botón para ordenar productos -->
      <button class="ordenar-btn" @click="ordenarProductos">Ordenar Productos</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const productos = ref([]);
  const carrito = ref([]);
  
  const obtenerImagenPokemon = async (nombre) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
      return response.data.sprites.front_default;
    } catch (error) {
      console.error(`Error obteniendo la imagen del Pokémon ${nombre}:`, error);
      return null;
    }
  };
  
  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/compras/productos');
      const productosConImagen = await Promise.all(response.data.map(async (producto) => {
        const imagen = await obtenerImagenPokemon(producto.Nombre);
        return {
          ...producto,
          cantidad: 0, // Agregamos un campo 'cantidad' inicializado a 0
          imagen // Agregamos la imagen del Pokémon
        };
      }));
      productos.value = productosConImagen;
    } catch (error) {
      console.error('Error obteniendo los productos:', error);
    }
  };
  
  const agregarAlCarrito = (producto) => {
    // Validar que la cantidad sea mayor que 0 para agregar al carrito
    if (producto.cantidad > 0) {
      carrito.value.push({
        IDProducto: producto.ID,
        NombreProducto: producto.Nombre,
        Cantidad: producto.cantidad,
        PrecioUnitario: producto.Precio
      });
      alert(`Producto "${producto.Nombre}" agregado al carrito.`);
      // Puedes limpiar el campo de cantidad después de agregar al carrito si lo deseas
      producto.cantidad = 0;
    } else {
      alert('Ingresa una cantidad mayor que 0 para agregar al carrito.');
    }
  };
  
  const guardarOrdenesDeCompra = async () => {
    try {
      for (const orden of carrito.value) {
        await axios.post('http://localhost:3001/api/compras/ordenes-compra', {
          IDProducto: orden.IDProducto,
          Cantidad: orden.Cantidad,
          PrecioUnitario: orden.PrecioUnitario
        });
      }
      alert('Órdenes de compra guardadas exitosamente.');
    } catch (error) {
      console.error('Error al guardar las órdenes de compra:', error);
      alert('Hubo un problema al guardar las órdenes de compra.');
    }
  };
  
  const ordenarProductos = async () => {
    if (carrito.value.length > 0) {
      await guardarOrdenesDeCompra();
      descargarCSV(carrito.value);
    } else {
      alert('El carrito está vacío. Agrega productos antes de ordenar.');
    }
  };
  
  const descargarCSV = (productos) => {
    const encabezados = [
      "IDProducto",
      "NombreProducto",
      "Cantidad",
      "PrecioUnitario"
    ];
  
    let csvContent = "data:text/csv;charset=utf-8," + encabezados.join(",") + "\n";
  
    productos.forEach((producto) => {
      const fila = [
        producto.IDProducto,
        producto.NombreProducto,
        producto.Cantidad,
        producto.PrecioUnitario
      ];
      csvContent += fila.join(",") + "\n";
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "OrdenesDeCompra.csv");
    document.body.appendChild(link);
  
    link.click();
  
    document.body.removeChild(link);
  };
  
  // Obtener los productos al montar el componente
  onMounted(() => {
    obtenerProductos();
  });
  </script>
  
  <style scoped>
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  h2 {
    margin: 0;
  }
  p {
    margin: 5px 0;
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
  .ordenar-btn {
    position: absolute;
    left: 50%;
    transform: translateX(-300%);
    top: 50%;
  }
  </style>
  