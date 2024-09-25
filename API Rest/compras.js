const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const connectionCompras = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Elfossinsangre511214!",
  database: "BDDSistemaCompras",
});

connectionCompras.connect((err) => {
  if (err) {
    console.error("Error connecting to the Compras database:", err);
  } else {
    console.log("Connected to the Compras database.");
  }
});

// Obtener todos los productos
router.get("/productos", (req, res) => {
  const query = "SELECT * FROM productos";
  connectionCompras.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});

// Insertar orden de compra
router.post("/ordenes-compra", (req, res) => {
  const { IDProducto, Cantidad, PrecioUnitario } = req.body;
  if (!IDProducto || !Cantidad || !PrecioUnitario) {
    return res
      .status(400)
      .json({ error: "IDProducto, Cantidad, and PrecioUnitario are required" });
  }

  const query =
    "INSERT INTO ordenes_de_compra (IDProducto, Cantidad, PrecioUnitario) VALUES (?, ?, ?)";
  connectionCompras.query(
    query,
    [IDProducto, Cantidad, PrecioUnitario],
    (error, results) => {
      if (error) {
        console.error("Error inserting into ordenes_de_compra:", error);
        return res.status(500).json({ error: error.message });
      }
      res
        .status(201)
        .json({
          message: "Orden de compra creada",
          ordenCompraId: results.insertId,
        });
    }
  );
});

// Obtener orden de compra por ID
router.get("/ordenes-compra/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM ordenes_de_compra WHERE ID = ?";
    connectionCompras.query(query, [id], (error, results) => {
      if (error) {
        console.error("Error retrieving order:", error);
        return res.status(500).json({ error });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Orden de compra no encontrada" });
      }
      res.json(results[0]);
    });
  });

module.exports = router;
