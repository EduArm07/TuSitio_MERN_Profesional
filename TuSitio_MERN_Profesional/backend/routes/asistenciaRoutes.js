import express from "express";
import {
  registrarEntrada,
  registrarSalida,
  getAsistencias,
} from "../controllers/asistenciaController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/entrada", verificarToken, registrarEntrada);
router.put("/:id/salida", verificarToken, registrarSalida); // ← ahora coincide con el frontend
router.get("/", verificarToken, getAsistencias);

export default router;