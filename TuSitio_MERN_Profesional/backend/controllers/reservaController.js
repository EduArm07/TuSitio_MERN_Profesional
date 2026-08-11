import Reserva from "../models/Reserva.js";

export const obtenerReservas =
async (req, res) => {

  const reservas =
    await Reserva.find()
    .populate("usuario")
    .populate("habitacion");

  res.json(reservas);
};

export const crearReserva =
async (req, res) => {

  const reserva =
    await Reserva.create(req.body);

  res.status(201).json(reserva);
};

export const obtenerReserva =
async (req, res) => {

  const reserva =
    await Reserva.findById(
      req.params.id
    );

  res.json(reserva);
};

export const actualizarReserva =
async (req, res) => {

  const reserva =
    await Reserva.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(reserva);
};

export const eliminarReserva =
async (req, res) => {

  await Reserva.findByIdAndDelete(
    req.params.id
  );

  res.json({
    mensaje: "Reserva eliminada"
  });
};