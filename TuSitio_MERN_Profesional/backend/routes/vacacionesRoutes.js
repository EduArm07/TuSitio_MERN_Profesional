import express from "express";
import {
  solicitarVacaciones,
  getVacaciones,
  aprobarVacaciones,
  rechazarVacaciones,
} from "../controllers/vacacionesController.js";
import { verificarToken, verificarRol } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verificarToken, solicitarVacaciones);
router.get("/", verificarToken, getVacaciones);
router.put("/:id/aprobar", verificarToken, verificarRol("admin", "gerente"), aprobarVacaciones);
router.put("/:id/rechazar", verificarToken, verificarRol("admin", "gerente"), rechazarVacaciones);

export default router;