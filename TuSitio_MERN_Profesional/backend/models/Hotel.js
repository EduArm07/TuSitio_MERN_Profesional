import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true
  },

  direccion: {
    type: String,
    required: true
  },

  ciudad: {
    type: String,
    required: true
  },

  descripcion: {
    type: String
  },

  telefono: {
    type: String
  },

  email: {
    type: String
  },

  imagen: {
    type: String
  },

  activo: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

export default mongoose.model("Hotel", hotelSchema);