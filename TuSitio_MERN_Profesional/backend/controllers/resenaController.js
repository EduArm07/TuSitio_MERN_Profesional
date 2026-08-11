import Resena from "../models/Resena.js";

export const obtenerResenas =
async (req, res) => {

  const resenas =
    await Resena.find()
    .populate("usuario")
    .populate("hotel");

  res.json(resenas);
};

export const crearResena =
async (req, res) => {

  const resena =
    await Resena.create(req.body);

  res.status(201).json(resena);
};

export const obtenerResena =
async (req, res) => {

  const resena =
    await Resena.findById(
      req.params.id
    );

  res.json(resena);
};

export const actualizarResena =
async (req, res) => {

  const resena =
    await Resena.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(resena);
};

export const eliminarResena =
async (req, res) => {

  await Resena.findByIdAndDelete(
    req.params.id
  );

  res.json({
    mensaje: "Reseña eliminada"
  });
};