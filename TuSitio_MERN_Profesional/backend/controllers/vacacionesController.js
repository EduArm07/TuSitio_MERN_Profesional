import Vacaciones from "../models/Vacaciones.js";

export const solicitarVacaciones = async (req, res) => {
  try {
    const vacaciones = new Vacaciones(req.body);
    const guardada = await vacaciones.save();
    res.status(201).json({ msg: "Solicitud creada correctamente", vacaciones: guardada });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getVacaciones = async (req, res) => {
  try {
    const { page = 1, limit = 10, estado, empleado_id } = req.query;
    const filter = {};
    if (estado) filter.estado = estado;
    if (empleado_id) filter.empleado_id = empleado_id;

    const vacaciones = await Vacaciones.paginate(filter, {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: "desc" },
      populate: { path: "empleado_id", select: "nombre dni departamento" },
    });

    res.status(200).json(vacaciones);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const aprobarVacaciones = async (req, res) => {
  try {
    const { comentario_gerente } = req.body;
    const vacaciones = await Vacaciones.findByIdAndUpdate(
      req.params.id,
      { estado: "aprobado", comentario_gerente, aprobado_por: req.usuario_id },
      { new: true }
    );
    if (!vacaciones) return res.status(404).json({ msg: "Solicitud no encontrada" });
    res.status(200).json({ msg: "Vacaciones aprobadas", vacaciones });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const rechazarVacaciones = async (req, res) => {
  try {
    const { comentario_gerente } = req.body;
    const vacaciones = await Vacaciones.findByIdAndUpdate(
      req.params.id,
      { estado: "rechazado", comentario_gerente, aprobado_por: req.usuario_id },
      { new: true }
    );
    if (!vacaciones) return res.status(404).json({ msg: "Solicitud no encontrada" });
    res.status(200).json({ msg: "Vacaciones rechazadas", vacaciones });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};