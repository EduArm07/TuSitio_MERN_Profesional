import express from "express";
import dotenv from "dotenv";
import Usuario from "./models/Usuario.js";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import habitacionRoutes from "./routes/habitacionRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import resenaRoutes from "./routes/resenaRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

conectarDB();

const app = express();

app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);

app.use("/api/hoteles", hotelRoutes);

app.use("/api/habitaciones", habitacionRoutes);

app.use("/api/reservas", reservaRoutes);

app.use("/api/resenas", resenaRoutes);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(
    `Servidor ejecutándose en puerto ${PORT}`
  );
});

app.get("/test", (req, res) => {
  res.json({
    mensaje: "API funcionando correctamente"
  });
});

app.post("/usuarios", async (req, res) => {

  try {

    const usuario = await Usuario.create(req.body);

    res.status(201).json(usuario);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});