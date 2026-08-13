import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  refreshAccessToken,
  getPerfil,
} from "../controllers/authController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);
router.post("/refresh", refreshAccessToken);
router.get("/perfil", verificarToken, getPerfil);

export default router;