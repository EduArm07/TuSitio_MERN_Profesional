import mongoose from "mongoose";
import dotenv from "dotenv";
import Empleado from "../models/Empleado.js";
import Usuario from "../models/Usuario.js";
import Asistencia from "../models/Asistencia.js";
import Vacaciones from "../models/Vacaciones.js";
import Evaluacion from "../models/Evaluacion.js";
import Menu from "../models/Menu.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    const admin = await Usuario.findOne({ rol: "admin" });
    if (!admin) {
      console.log("❌ No hay usuario con rol 'admin'.");
      process.exit(1);
    }

    // 1) Asegura los 3 empleados (los crea si no existen; no toca a Sebastian)
    const empleadosBase = [
      { nombre: "María López", dni: "74863163", correo: "maria@workday.com", cargo: "Desarrolladora", departamento: "TI", salario: 3500 },
      { nombre: "Jorge Pérez", dni: "74863164", correo: "jorge@workday.com", cargo: "Contador", departamento: "Finanzas", salario: 2800 },
      { nombre: "Ana Torres", dni: "74863165", correo: "ana@workday.com", cargo: "Vendedora", departamento: "Ventas", salario: 2200 },
    ];
    for (const e of empleadosBase) {
      await Empleado.findOneAndUpdate({ dni: e.dni }, e, { upsert: true, new: true });
    }
    const maria = await Empleado.findOne({ dni: "74863163" });
    const jorge = await Empleado.findOne({ dni: "74863164" });
    const ana = await Empleado.findOne({ dni: "74863165" });
    console.log("✅ Empleados asegurados: María, Jorge y Ana");

    // 2) Limpia huérfanos y pruebas anteriores (adiós filas con "—")
    await Asistencia.deleteMany({});
    await Vacaciones.deleteMany({});
    await Evaluacion.deleteMany({});
    await Menu.deleteMany({});
    console.log("🧹 Datos huérfanos eliminados");

    // 3) Asistencias enlazadas
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);

    await Asistencia.create([
      { empleado_id: maria._id, fecha: hoy, hora_entrada: "08:55", hora_salida: "17:30", horas_trabajadas: 8.5, tardanza: false },
      { empleado_id: jorge._id, fecha: hoy, hora_entrada: "09:20", hora_salida: "17:00", horas_trabajadas: 7.6, tardanza: true },
      { empleado_id: ana._id, fecha: hoy, hora_entrada: "08:45", tardanza: false },
      { empleado_id: maria._id, fecha: ayer, hora_entrada: "08:50", hora_salida: "17:35", horas_trabajadas: 8.7, tardanza: false },
      { empleado_id: jorge._id, fecha: ayer, hora_entrada: "09:35", hora_salida: "18:00", horas_trabajadas: 8.4, tardanza: true },
      { empleado_id: ana._id, fecha: ayer, hora_entrada: "08:30", hora_salida: "16:00", horas_trabajadas: 7.5, tardanza: false },
    ]);
    console.log("🕐 Asistencias sembradas");

    // 4) Vacaciones en los 3 estados
    await Vacaciones.create([
      { empleado_id: maria._id, fecha_inicio: "2026-09-01", fecha_fin: "2026-09-05", dias: 5, motivo: "Viaje familiar", estado: "pendiente" },
      { empleado_id: jorge._id, fecha_inicio: "2026-12-15", fecha_fin: "2026-12-22", dias: 7, motivo: "Vacaciones de verano", estado: "aprobado", comentario_gerente: "Aprobado, buen desempeño", aprobado_por: admin._id },
      { empleado_id: ana._id, fecha_inicio: "2026-08-10", fecha_fin: "2026-08-12", dias: 3, motivo: "Asuntos personales", estado: "rechazado", comentario_gerente: "Cierre de mes en Ventas", aprobado_por: admin._id },
    ]);
    console.log("🌴 Vacaciones sembradas");

    // 5) Evaluaciones con promedios
    const evalMaria = [
      { nombre: "Puntualidad", puntuacion: 5 },
      { nombre: "Calidad de trabajo", puntuacion: 5 },
      { nombre: "Trabajo en equipo", puntuacion: 4 },
    ];
    const evalJorge = [
      { nombre: "Puntualidad", puntuacion: 2 },
      { nombre: "Calidad de trabajo", puntuacion: 4 },
      { nombre: "Trabajo en equipo", puntuacion: 4 },
    ];
    await Evaluacion.create([
      { empleado_id: maria._id, gerente_id: admin._id, periodo: "2026-1", criterios: evalMaria, promedio: evalMaria.reduce((s, c) => s + c.puntuacion, 0) / evalMaria.length, comentario: "Excelente desempeño general." },
      { empleado_id: jorge._id, gerente_id: admin._id, periodo: "2026-1", criterios: evalJorge, promedio: evalJorge.reduce((s, c) => s + c.puntuacion, 0) / evalJorge.length, comentario: "Mejorar puntualidad." },
    ]);
    console.log("📊 Evaluaciones sembradas");

    // 6) Menú dinámico
    await Menu.create([
      { title: "Inicio", path: "/", icon: "🏠", order: 1, active: true, roles: ["empleado", "gerente", "admin"] },
      { title: "Asistencias", path: "/admin/asistencias", icon: "🕐", order: 2, active: true, roles: ["empleado", "gerente", "admin"] },
      { title: "Vacaciones", path: "/admin/vacaciones", icon: "🌴", order: 3, active: true, roles: ["empleado", "gerente", "admin"] },
      { title: "Evaluaciones", path: "/admin/evaluaciones", icon: "📊", order: 4, active: true, roles: ["gerente", "admin"] },
      { title: "Empleados", path: "/admin/empleados", icon: "💼", order: 5, active: true, roles: ["gerente", "admin"] },
    ]);
    console.log("📋 Menú sembrado");

    console.log("🎉 ¡SEED V2 COMPLETO! Recarga el panel (F5).");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al sembrar:", error.message);
    process.exit(1);
  }
};

seed();