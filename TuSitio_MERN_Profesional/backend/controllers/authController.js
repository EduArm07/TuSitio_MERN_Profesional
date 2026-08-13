import Usuario from "../models/Usuario.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "../utils/jwt.js";

// Registrar usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, dni, correo, password, rol, cargo, departamento, salario } = req.body;

    const existeUsuario = await Usuario.findOne({ $or: [{ correo }, { dni }] });
    if (existeUsuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    const usuario = new Usuario({
      nombre,
      dni,
      correo,
      password,
      rol: rol || "empleado",
      cargo,
      departamento,
      salario,
    });

    const usuarioGuardado = await usuario.save();

    res.status(201).json({
      msg: "Usuario registrado correctamente",
      user: usuarioGuardado,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Login (devuelve Access + Refresh Token)
export const loginUsuario = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({ correo }).select("+password");
    if (!usuario) {
      return res.status(401).json({ msg: "Credenciales incorrectas" });
    }

    const isMatch = await usuario.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Credenciales incorrectas" });
    }

    if (!usuario.activo) {
      return res.status(401).json({ msg: "Usuario no autorizado o no activo" });
    }

    res.json({
      msg: "Login correcto",
      access: createAccessToken(usuario),
      refresh: createRefreshToken(usuario),
      user: {
        _id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Refrescar el AccessToken
export const refreshAccessToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ msg: "El token es obligatorio" });
    }

    const decoded = verifyToken(token);

    if (!decoded || decoded.token_type !== "refresh") {
      return res.status(401).json({ msg: "Token inválido o expirado" });
    }

    const usuario = await Usuario.findById(decoded.user_id);
    if (!usuario || !usuario.activo) {
      return res.status(404).json({ msg: "Usuario no encontrado o inactivo" });
    }

    res.status(200).json({ accessToken: createAccessToken(usuario) });
  } catch (error) {
    res.status(401).json({ msg: "Token inválido o expirado", error: error.message });
  }
};

// Obtener datos del usuario logueado
export const getPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario_id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.status(200).json({ user: usuario });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};