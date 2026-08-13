import { verifyToken } from "../utils/jwt.js";

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No hay token, autorización denegada" });
  }

  const decoded = verifyToken(token);

  if (!decoded || decoded.token_type !== "access") {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }

  req.usuario_id = decoded.user_id;
  req.usuario_rol = decoded.rol;
  next();
};

export const verificarRol = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario_rol) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    if (!roles.includes(req.usuario_rol)) {
      return res.status(403).json({ msg: "No tienes permisos para realizar esta acción" });
    }
    next();
  };
};