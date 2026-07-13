const jwt = require("jsonwebtoken");

const generateToken = (usuario) => {
        return jwt.sign({
            id: usuario.id,
            nombre: usuario.nombre,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        },

    );


};

module.exports = generateToken;