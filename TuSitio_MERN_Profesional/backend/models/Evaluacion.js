import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const evaluacionSchema = new mongoose.Schema(
  {
    empleado_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado",
      required: true,
    },
    gerente_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    periodo: {
      type: String,
      required: true,
      trim: true,
    },
    criterios: [
      {
        nombre: { type: String, required: true },
        puntuacion: { type: Number, min: 0, max: 5, required: true },
      },
    ],
    promedio: {
      type: Number,
      default: 0,
    },
    comentario: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

evaluacionSchema.plugin(mongoosePaginate);

export default mongoose.model("Evaluacion", evaluacionSchema);