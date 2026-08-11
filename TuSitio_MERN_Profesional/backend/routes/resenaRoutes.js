// Resena Routes
import express from "express";

import {
  obtenerResenas,
  crearResena,
  obtenerResena,
  actualizarResena,
  eliminarResena
} from "../controllers/resenaController.js";

const router = express.Router();

router.route("/")
  .get(obtenerResenas)
  .post(crearResena);

router.route("/:id")
  .get(obtenerResena)
  .put(actualizarResena)
  .delete(eliminarResena);

export default router;