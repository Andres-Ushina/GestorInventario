const express = require("express");

const productos = require("./routes/productos.route");
const autenticacion = require("./routes/auth_routes");
const categorias = require("./routes/categorias.route");
const usuarios = require("./routes/usuarios.routers");
const cors = require("cors");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use (cors());


app.use(express.urlencoded({ extended: true }));

app.use("/productos", productos);
app.use("/categorias", categorias);
app.use("/usuarios", usuarios);
app.use("/auth", autenticacion);

app.listen(PORT, () => {
    console.log("Escuchando en el puerto " + PORT);
});
