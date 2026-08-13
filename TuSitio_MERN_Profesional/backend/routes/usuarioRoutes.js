import express from "express";
import {
  getMe,
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuarioController.js";
import { verificarToken, verificarRol } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", verificarToken, getMe);
router.get("/", verificarToken, verificarRol("admin"), getUsuarios);
router.post("/", verificarToken, verificarRol("admin"), crearUsuario);
router.put("/:id", verificarToken, verificarRol("admin"), actualizarUsuario);
router.delete("/:id", verificarToken, verificarRol("admin"), eliminarUsuario);

export default router;