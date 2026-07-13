const express = require('express');
const bcrypt = require("bcrypt");

const router = express.Router();
const conexion = require("../database/conexion");
const generateToken = require("../config/jwt");

router.post("/login", async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({ "Mensaje": "Ingrese las credenciales correctas" });
        }

        const consulta = `
            SELECT u.id, u.nombre, u.correo, u.password, r.nombre AS rol FROM usuarios u
            INNER JOIN roles r ON u.id_rol = r.id WHERE u.correo = $1
        `;

        const resultado = await conexion.query(consulta, [correo]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ "Mensaje": "Usuario no encontrado" });
        }

        const usuario = resultado.rows[0];
        const esCorrecto = await bcrypt.compare(password, usuario.password);

        if (!esCorrecto) {
            return res.status(401).json({ "Mensaje": "Contraseña incorrecta" });
        }

        const token = generateToken(usuario);
        delete usuario.password;

        return res.json({
            "Mensaje": "Inicio de sesión exitoso",
            token,
            usuario
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "Mensaje": "Error en el servidor" });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({ "Mensaje": "Ingrese las credenciales correctas" });
        }

        const consulta = `
            SELECT * FROM usuarios WHERE correo = $1
        `;

        const resultado = await conexion.query(consulta, [correo]);

        if (resultado.rows.length > 0) {
            return res.status(400).json({ "Mensaje": "El correo electrónico ya existe" });
        }

        const passwordEncriptada = await bcrypt.hash(password, 10);

        const resultadousuario = await conexion.query(`
            INSERT INTO usuarios (nombre, correo, password, id_rol)
            VALUES ($1, $2, $3, 3)
            RETURNING id, nombre, correo;
        `, [nombre, correo, passwordEncriptada]);

        return res.status(201).json({
            "Mensaje": "Usuario creado exitosamente",
            "usuario": resultadousuario.rows[0]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "Mensaje": "Error en el servidor" });
    }
});

module.exports = router;