import Menu from "../models/Menu.js";

export const crearMenu = async (req, res) => {
  try {
    const menu = new Menu(req.body);
    const guardado = await menu.save();
    res.status(201).json({ msg: "Menú creado correctamente", menu: guardado });
  } catch (error) {
    res.status(400).json({ msg: "Error al crear el menú", error: error.message });
  }
};

export const getMenus = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = {};
    if (active !== undefined) filter.active = active === "true";

    const menus = await Menu.find(filter).sort({ order: "asc" });

    if (!menus || menus.length === 0) {
      return res.status(404).json({ msg: "No se ha encontrado ningún menú" });
    }

    res.status(200).json(menus);
  } catch (error) {
    res.status(400).json({ msg: "Error al obtener los menús", error: error.message });
  }
};

export const actualizarMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menu) return res.status(404).json({ msg: "Menú no encontrado" });
    res.status(200).json({ msg: "Menú actualizado correctamente", menu });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const eliminarMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ msg: "Menú no encontrado" });
    res.status(200).json({ msg: "Menú eliminado correctamente", menu });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};