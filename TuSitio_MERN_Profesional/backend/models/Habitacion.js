import mongoose from "mongoose";

const habitacionSchema = new mongoose.Schema({

  numero: {
    type: String,
    required: true
  },

  tipo: {
    type: String,
    required: true
  },

  capacidad: {
    type: Number,
    required: true
  },

  precio_noche: {
    type: Number,
    required: true
  },

  descripcion: {
    type: String
  },

  amenidades: [{
    type: String
  }],

  fotos: [{
    type: String
  }],

  activa: {
    type: Boolean,
    default: true
  },

  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel"
  }

}, {
  timestamps: true
});

export default mongoose.model(
  "Habitacion",
  habitacionSchema
);