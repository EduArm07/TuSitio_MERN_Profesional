// Modelo Resenaconst mongoose = require("mongoose");

import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({

  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },

  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel"
  },

  puntuacion: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },

  comentario: {
    type: String
  }

}, {
  timestamps: true
});

export default mongoose.model(
  "Resena",
  resenaSchema
);
