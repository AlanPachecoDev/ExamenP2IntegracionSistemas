-- Crear la base de datos
CREATE DATABASE BDDSistemaCompras;

-- Usar la base de datos
USE BDDSistemaCompras;

-- Crear la tabla productos
CREATE TABLE productos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Precio DECIMAL(10, 2) NOT NULL
);

-- Crear la tabla ordenes_de_compra
CREATE TABLE ordenes_de_compra (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    IDProducto INT,
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (IDProducto) REFERENCES productos(ID)
);
