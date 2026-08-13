import Evaluacion from "../models/Evaluacion.js";

export const crearEvaluacion = async (req, res) => {
  try {
    const { criterios } = req.body;

    if (!criterios || criterios.length === 0) {
      return res.status(400).json({ msg: "Debe enviar al menos un criterio" });
    }

    const promedio =
      criterios.reduce((sum, c) => sum + Number(c.puntuacion), 0) / criterios.length;

    const evaluacion = new Evaluacion({
      ...req.body,
      gerente_id: req.usuario_id,
      promedio,
    });

    const guardada = await evaluacion.save();
    res.status(201).json({ msg: "Evaluación creada correctamente", evaluacion: guardada });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getEvaluaciones = async (req, res) => {
  try {
    const { page = 1, limit = 10, empleado_id } = req.query;
    const filter = {};
    if (empleado_id) filter.empleado_id = empleado_id;

    const evaluaciones = await Evaluacion.paginate(filter, {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: "desc" },
      populate: [
        { path: "empleado_id", select: "nombre dni cargo" },
        { path: "gerente_id", select: "nombre correo" },
      ],
    });

    res.status(200).json(evaluaciones);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};