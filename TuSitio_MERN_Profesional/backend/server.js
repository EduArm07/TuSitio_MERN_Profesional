import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import empleadoRoutes from "./routes/empleadoRoutes.js";
import asistenciaRoutes from "./routes/asistenciaRoutes.js";
import vacacionesRoutes from "./routes/vacacionesRoutes.js";
import evaluacionRoutes from "./routes/evaluacionRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";

dotenv.config();
conectarDB();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/empleados", empleadoRoutes);
app.use("/api/asistencias", asistenciaRoutes);
app.use("/api/vacaciones", vacacionesRoutes);
app.use("/api/evaluaciones", evaluacionRoutes);
app.use("/api/menu", menuRoutes);

app.get("/test", (req, res) => {
  res.json({ mensaje: "API Workday funcionando correctamente" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor Workday ejecutándose en puerto ${PORT}`);
});