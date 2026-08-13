import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const asistenciaSchema = new mongoose.Schema(
  {
    empleado_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado",
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default: Date.now,
    },
    hora_entrada: {
      type: String,
      required: true,
    },
    hora_salida: {
      type: String,
    },
    horas_trabajadas: {
      type: Number,
      default: 0,
    },
    tardanza: {
      type: Boolean,
      default: false,
    },
    observaciones: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Agregar plugin de paginación
asistenciaSchema.plugin(mongoosePaginate);

export default mongoose.model("Asistencia", asistenciaSchema);