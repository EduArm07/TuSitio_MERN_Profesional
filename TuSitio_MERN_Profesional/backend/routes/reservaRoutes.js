// Reserva Routes

import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {

  obtenerReservas,

  crearReserva,

  obtenerReserva,

  actualizarReserva,

  eliminarReserva

} from "../controllers/reservaController.js";

const router = express.Router();

router.route("/")

.get(

  authMiddleware,

  obtenerReservas

)

.post(

  authMiddleware,

  crearReserva

);

router.route("/:id")

.get(

  authMiddleware,

  obtenerReserva

)

.put(

  authMiddleware,

  actualizarReserva

)

.delete(

  authMiddleware,

  eliminarReserva

);

export default router;