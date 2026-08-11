// Habitacion Routes
import express from "express";

import {
  obtenerHabitaciones,
  crearHabitacion,
  obtenerHabitacion,
  actualizarHabitacion,
  eliminarHabitacion
} from "../controllers/habitacionController.js";

const router = express.Router();

router.route("/")
  .get(obtenerHabitaciones)
  .post(crearHabitacion);

router.route("/:id")
  .get(obtenerHabitacion)
  .put(actualizarHabitacion)
  .delete(eliminarHabitacion);

export default router;