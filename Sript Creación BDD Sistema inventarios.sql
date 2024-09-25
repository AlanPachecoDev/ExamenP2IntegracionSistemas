-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS BDDSistemaInventarios;

-- Usar la base de datos recién creada
USE BDDSistemaInventarios;

-- Crear la tabla 'productos' con los atributos especificados
CREATE TABLE IF NOT EXISTS productos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Precio DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL
);

-- Crear la tabla 'facturas' con los atributos especificados
CREATE TABLE IF NOT EXISTS facturas (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NombreCliente VARCHAR(255) NOT NULL,
    CedulaCliente VARCHAR(20) NOT NULL,
    NombreProducto VARCHAR(255) NOT NULL,
    DescripcionProducto VARCHAR(255) NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    Cantidad INT NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL
);
