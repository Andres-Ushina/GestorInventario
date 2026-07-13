const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

const conexion = require("../database/conexion");
const autenticacion = require("../middlewares/autenticacion");
const autorizacion = require("../middlewares/autorizacion");

router.get("/", autenticacion, autorizacion("Admin"), async (req, res) => {
    try {
        const resultado = await conexion.query(`
            SELECT id, nombre, correo FROM usuarios ORDER BY id;
        `);

        res.status(200).json(resultado.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "mensaje": "Error en obtener usuarios" });
    }
});

module.exports = router;
