import Empleado from "../models/Empleado.js";

export const crearEmpleado = async (req, res) => {
  try {
    const empleado = new Empleado(req.body);
    const guardado = await empleado.save();
    res.status(201).json({ msg: "Empleado creado correctamente", empleado: guardado });
  } catch (error) {
    res.status(400).json({ msg: "Error al crear el empleado", error: error.message });
  }
};

export const getEmpleados = async (req, res) => {
  try {
    const { page = 1, limit = 10, activo, search } = req.query;
    const filter = {};

    if (activo !== undefined) filter.activo = activo === "true";
    if (search) {
      filter.$or = [
        { nombre: { $regex: search, $options: "i" } },
        { dni: { $regex: search, $options: "i" } },
        { departamento: { $regex: search, $options: "i" } },
      ];
    }

    const empleados = await Empleado.paginate(filter, {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: "desc" },
    });

    res.status(200).json(empleados);
  } catch (error) {
    res.status(400).json({ msg: "Error al obtener los empleados", error: error.message });
  }
};

export const getEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.status(404).json({ msg: "Empleado no encontrado" });
    res.status(200).json(empleado);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const actualizarEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empleado) return res.status(404).json({ msg: "Empleado no encontrado" });
    res.status(200).json({ msg: "Empleado actualizado correctamente", empleado });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const eliminarEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) return res.status(404).json({ msg: "Empleado no encontrado" });
    res.status(200).json({ msg: "Empleado eliminado correctamente", empleado });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};