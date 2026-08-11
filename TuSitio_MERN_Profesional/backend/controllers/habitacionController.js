import Habitacion from "../models/Habitacion.js";

// Obtener habitaciones
export const obtenerHabitaciones =
async (req, res) => {

  const habitaciones =
    await Habitacion.find()
    .populate("hotel");

  res.json(habitaciones);
};

// Crear habitación
export const crearHabitacion =
async (req, res) => {

  const habitacion =
    await Habitacion.create(req.body);

  res.status(201).json(habitacion);
};

// Obtener una habitación
export const obtenerHabitacion =
async (req, res) => {

  const habitacion =
    await Habitacion.findById(
      req.params.id
    );

  res.json(habitacion);
};

// Actualizar
export const actualizarHabitacion =
async (req, res) => {

  const habitacion =
    await Habitacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(habitacion);
};

// Eliminar
export const eliminarHabitacion =
async (req, res) => {

  await Habitacion.findByIdAndDelete(
    req.params.id
  );

  res.json({
    mensaje: "Habitación eliminada"
  });
};