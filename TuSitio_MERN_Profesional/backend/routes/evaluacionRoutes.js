import express from "express";
import {
  crearEvaluacion,
  getEvaluaciones,
} from "../controllers/evaluacionController.js";
import { verificarToken, verificarRol } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verificarToken, verificarRol("admin", "gerente"), crearEvaluacion);
router.get("/", verificarToken, getEvaluaciones);

export default router;