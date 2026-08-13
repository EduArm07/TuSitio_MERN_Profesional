import express from "express";
import {
  crearEmpleado,
  getEmpleados,
  getEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
} from "../controllers/empleadoController.js";
import { verificarToken, verificarRol } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verificarToken, verificarRol("admin", "gerente"), crearEmpleado);
router.get("/", verificarToken, getEmpleados);
router.get("/:id", verificarToken, getEmpleado);
router.put("/:id", verificarToken, verificarRol("admin", "gerente"), actualizarEmpleado);
router.delete("/:id", verificarToken, verificarRol("admin"), eliminarEmpleado);

export default router;