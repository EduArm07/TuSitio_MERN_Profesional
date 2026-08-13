import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const vacacionesSchema = new mongoose.Schema(
  {
    empleado_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado",
      required: true,
    },
    fecha_inicio: {
      type: Date,
      required: true,
    },
    fecha_fin: {
      type: Date,
      required: true,
    },
    dias: {
      type: Number,
      required: true,
      min: 1,
    },
    motivo: {
      type: String,
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado"],
      default: "pendiente",
    },
    comentario_gerente: {
      type: String,
      trim: true,
    },
    aprobado_por: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

vacacionesSchema.plugin(mongoosePaginate);

export default mongoose.model("Vacaciones", vacacionesSchema);