import express from "express";

import {
  obtenerUsuarios,
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuarioController.js";

const router = express.Router();

router.route("/")
  .get(obtenerUsuarios)
  .post(crearUsuario);

router.route("/:id")
  .get(obtenerUsuario)
  .put(actualizarUsuario)
  .delete(eliminarUsuario);

export default router;