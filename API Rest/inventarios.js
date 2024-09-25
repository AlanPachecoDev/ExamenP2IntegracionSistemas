const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const connectionInventarios = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Elfossinsangre511214!",
  database: "BDDSistemaInventarios",
});

connectionInventarios.connect((err) => {
  if (err) {
    console.error("Error connecting to the Inventarios database:", err);
  } else {
    console.log("Connected to the Inventarios database.");
  }
});

// Endpoint para actualizar el stock de un producto
router.put("/productos/:id/stock", (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  const query = "UPDATE productos SET Stock = Stock - ? WHERE ID = ?";
  connectionInventarios.query(query, [cantidad, id], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.status(200).json({ message: "Stock actualizado" });
  });
});

// Endpoint para obtener un producto por ID
router.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM productos WHERE ID = ?";
  connectionInventarios.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(results[0]);
  });
});

// Endpoint para insertar una factura
router.post("/facturas", (req, res) => {
  const {
    NombreCliente,
    CedulaCliente,
    NombreProducto,
    DescripcionProducto,
    Precio,
    Cantidad,
    Subtotal,
  } = req.body;

  const query = `
      INSERT INTO facturas 
        (NombreCliente, CedulaCliente, NombreProducto, DescripcionProducto, Precio, Cantidad, Subtotal) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
    NombreCliente,
    CedulaCliente,
    NombreProducto,
    DescripcionProducto,
    Precio,
    Cantidad,
    Subtotal,
  ];

  connectionInventarios.query(query, values, (error, results) => {
    if (error) {
      console.error("Error inserting into facturas:", error);
      return res.status(500).json({ error });
    }
    res.status(201).json({
      message: "Factura creada",
      facturaId: results.insertId,
    });
  });
});

module.exports = router;
