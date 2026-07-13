-- Crear usuario de base de datos
CREATE USER root WITH PASSWORD 'ajus123';

-- Crear base de datos Tienda (ejecutar como superuser)
-- CREATE DATABASE "Tienda";

-- Otorgar privilegios al usuario root
GRANT ALL PRIVILEGES ON DATABASE "Tienda" TO root;

-- Crear tabla roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE roles TO root;
GRANT USAGE, SELECT ON SEQUENCE roles_id_seq TO root;

-- Insertar roles predefinidos
INSERT INTO roles (nombre) VALUES 
('Admin'),
('Vendedor'),
('Cliente');

-- Crear tabla usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    id_rol INTEGER NOT NULL DEFAULT 3,
    CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES roles(id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE usuarios TO root;
GRANT USAGE, SELECT ON SEQUENCE usuarios_id_seq TO root;

-- Crear tabla productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    stock INTEGER,
    precio NUMERIC(10,2),
    imagen TEXT
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE productos TO root;
GRANT USAGE, SELECT ON SEQUENCE productos_id_seq TO root;

-- Crear tabla categorías
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE,
    descripcion TEXT
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE categorias TO root;
GRANT USAGE, SELECT ON SEQUENCE categorias_id_seq TO root;
