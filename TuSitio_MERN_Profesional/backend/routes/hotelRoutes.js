// Hotel Routes
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  obtenerHoteles,
  crearHotel,
  obtenerHotel,
  actualizarHotel,
  eliminarHotel
} from "../controllers/hotelController.js";

const router = express.Router();

// Todos pueden consultar hoteles
router.route("/")
  .get(obtenerHoteles)

// Solo el administrador puede crear hoteles
  .post(
    authMiddleware,
    roleMiddleware("admin"),
    crearHotel
  );

// Todos pueden ver el detalle de un hotel
router.route("/:id")
  .get(obtenerHotel)

// Solo el administrador puede actualizar
  .put(
    authMiddleware,
    roleMiddleware("admin"),
    actualizarHotel
  )

// Solo el administrador puede eliminar
  .delete(
    authMiddleware,
    roleMiddleware("admin"),
    eliminarHotel
  );

export default router;