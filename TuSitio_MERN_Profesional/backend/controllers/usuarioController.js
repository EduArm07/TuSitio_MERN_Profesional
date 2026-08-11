import Usuario from "../models/Usuario.js";

// Obtener usuarios
export const obtenerUsuarios = async (req, res) => {

  try {

    const usuarios = await Usuario.find();

    res.json(usuarios);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }

};

// Crear usuario
export const crearUsuario = async (req, res) => {

  try {

    const usuario = await Usuario.create(req.body);

    res.status(201).json(usuario);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }

};

// Obtener usuario por ID
export const obtenerUsuario = async (req, res) => {

  try {

    const usuario = await Usuario.findById(
      req.params.id
    );

    res.json(usuario);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }

};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {

  try {

    const usuario =
      await Usuario.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(usuario);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }

};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {

  try {

    await Usuario.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensaje: "Usuario eliminado"
    });

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }

};