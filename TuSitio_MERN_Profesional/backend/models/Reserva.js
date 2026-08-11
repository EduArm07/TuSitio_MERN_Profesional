import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({

  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },

  habitacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habitacion",
    required: true
  },

  fechaEntrada: {
    type: Date,
    required: true
  },

  fechaSalida: {
    type: Date,
    required: true
  },

  cantidadHuespedes: {
    type: Number,
    required: true
  },

  total: {
    type: Number,
    required: true
  },

  estado: {
    type: String,
    enum: [
      "pendiente",
      "confirmada",
      "cancelada"
    ],
    default: "pendiente"
  }

}, {
  timestamps: true
});

export default mongoose.model(
  "Reserva",
  reservaSchema
);