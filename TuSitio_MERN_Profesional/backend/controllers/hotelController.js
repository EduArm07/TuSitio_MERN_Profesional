import Hotel from "../models/Hotel.js";

// Obtener hoteles
export const obtenerHoteles = async (req, res) => {
  try {
    const hoteles = await Hotel.find();

    res.json(hoteles);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
};

// Crear hotel
export const crearHotel = async (req, res) => {

  try {

    const hotel = await Hotel.create(req.body);

    res.status(201).json(hotel);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
};

// Obtener hotel por ID
export const obtenerHotel = async (req, res) => {

  try {

    const hotel = await Hotel.findById(
      req.params.id
    );

    res.json(hotel);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
};

// Actualizar hotel
export const actualizarHotel = async (req, res) => {

  try {

    const hotel =
      await Hotel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(hotel);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
};

// Eliminar hotel
export const eliminarHotel = async (req, res) => {

  try {

    await Hotel.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensaje: "Hotel eliminado"
    });

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }
};