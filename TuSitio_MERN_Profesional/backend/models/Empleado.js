import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const empleadoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    dni: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    cargo: {
      type: String,
      required: true,
      trim: true,
    },
    departamento: {
      type: String,
      required: true,
      trim: true,
    },
    salario: {
      type: Number,
      required: true,
      min: 0,
    },
    fecha_ingreso: {
      type: Date,
      default: Date.now,
    },
    activo: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Agregar plugin de paginación
empleadoSchema.plugin(mongoosePaginate);

export default mongoose.model("Empleado", empleadoSchema);