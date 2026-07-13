const express = require("express");

const router = express.Router();

const conexion = require("../database/conexion");
const autenticacion = require("../middlewares/autenticacion");

//GET - Obtener todas las categorías
router.get("/", autenticacion, async (req, res) => {
    try {
        const resultado = await conexion.query(`
            SELECT * FROM categorias ORDER BY id;
        `);

        res.status(200).json(resultado.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "mensaje": "Error en obtener categorías" });
    }
});

//GET - Obtener categoría por ID
router.get("/:id", autenticacion, async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await conexion.query(`
            SELECT * FROM categorias WHERE id = $1;
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ "mensaje": "Categoría no encontrada" });
        }

        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "mensaje": "Error en obtener la categoría" });
    }
});

//POST - Crear nueva categoría
router.post("/", autenticacion, async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({ "mensaje": "El nombre es requerido" });
        }

        const resultado = await conexion.query(`
            INSERT INTO categorias (nombre, descripcion)
            VALUES ($1, $2)
            RETURNING *;
        `, [nombre, descripcion]);

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "mensaje": "No se pudo crear la categoría" });
    }
});

//PUT - Actualizar categoría
router.put("/:id", autenticacion, async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const resultado = await conexion.query(`
            UPDATE categorias
            SET nombre = $1, descripcion = $2
            WHERE id = $3
            RETURNING *;
        `, [nombre, descripcion, id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ "mensaje": "Categoría no encontrada" });
        }

        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "mensaje": "No se pudo actualizar la categoría" });
    }
});

//DELETE - Eliminar categoría
router.delete("/:id", autenticacion, async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await conexion.query(`
            DELETE FROM categorias
            WHERE id = $1
            RETURNING *;
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ "mensaje": "Categoría no encontrada" });
        }

        res.status(200).json({ "mensaje": "Categoría eliminada correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "mensaje": "No se pudo eliminar la categoría" });
    }
});



module.exports = router;
