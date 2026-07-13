const autorizacion = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({ "Mensaje": "Usuario no autenticado" });
        }

        if(!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ "Mensaje": "Usuario no tiene permisos" });
        }

        next();
}}

module.exports = autorizacion;