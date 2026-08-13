import express from "express";
import {
  crearMenu,
  getMenus,
  actualizarMenu,
  eliminarMenu,
} from "../controllers/menuController.js";
import { verificarToken, verificarRol } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMenus); // Público (como el profesor)
router.post("/", verificarToken, verificarRol("admin"), crearMenu);
router.put("/:id", verificarToken, verificarRol("admin"), actualizarMenu);
router.delete("/:id", verificarToken, verificarRol("admin"), eliminarMenu);

export default router;