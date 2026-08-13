import Asistencia from "../models/Asistencia.js";

export const registrarEntrada = async (req, res) => {
  try {
    const { empleado_id } = req.body;
    const ahora = new Date();
    const horaActual = ahora.toTimeString().slice(0, 5);
    const tardanza = horaActual > "09:00";

    const asistencia = new Asistencia({
      empleado_id,
      fecha: ahora,
      hora_entrada: horaActual,
      tardanza,
    });

    const guardada = await asistencia.save();
    res.status(201).json({ msg: "Entrada registrada", asistencia: guardada });
  } catch (error) {
    res.status(400).json({ msg: "Error al registrar la entrada", error: error.message });
  }
};

export const registrarSalida = async (req, res) => {
  try {
    const horaActual = new Date().toTimeString().slice(0, 5);

    const asistencia = await Asistencia.findById(req.params.id);
    if (!asistencia) return res.status(404).json({ msg: "Asistencia no encontrada" });

    asistencia.hora_salida = horaActual;

    const [h1, m1] = asistencia.hora_entrada.split(":").map(Number);
    const [h2, m2] = horaActual.split(":").map(Number);
    asistencia.horas_trabajadas = Math.max(0, (h2 * 60 + m2 - (h1 * 60 + m1)) / 60);

    await asistencia.save();
    res.status(200).json({ msg: "Salida registrada", asistencia });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getAsistencias = async (req, res) => {
  try {
    const { page = 1, limit = 10, empleado_id } = req.query;
    const filter = {};
    if (empleado_id) filter.empleado_id = empleado_id;

    const asistencias = await Asistencia.paginate(filter, {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { fecha: "desc" },
      populate: { path: "empleado_id", select: "nombre dni departamento" },
    });

    res.status(200).json(asistencias);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};