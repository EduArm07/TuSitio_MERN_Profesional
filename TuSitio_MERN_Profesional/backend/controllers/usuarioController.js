import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

export const getMe = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario_id);
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });
    res.status(200).json({ user: usuario });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUsuarios = async (req, res) => {
  try {
    const { activo } = req.query;
    const filter = {};
    if (activo !== undefined) filter.activo = activo === "true";

    const usuarios = await Usuario.find(filter).sort({ createdAt: "desc" });
    res.status(200).json({ response: usuarios });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, dni, correo, password, rol } = req.body;

    if (!nombre || !dni || !correo || !password) {
      return res.status(400).json({ msg: "Faltan campos obligatorios" });
    }

    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(400).json({ msg: "El usuario ya existe" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      dni,
      correo,
      password: hashedPassword,
      rol: rol || "empleado",
    });

    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json({ msg: "Usuario creado correctamente", user: usuarioGuardado });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const userData = { ...req.body };

    if (userData.password) {
      const salt = bcrypt.genSaltSync(10);
      userData.password = bcrypt.hashSync(userData.password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, userData, { new: true });
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });
    res.status(200).json({ msg: "Actualización correcta", user: usuario });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });
    res.status(200).json({ msg: "Usuario eliminado correctamente", user: usuario });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};