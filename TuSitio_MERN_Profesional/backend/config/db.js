import mongoose from "mongoose";

const conectarDB = async () => {
  try {

    const conexion = await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      `MongoDB conectado: ${conexion.connection.host}`
    );

  } catch (error) {

    console.log(error);

    process.exit(1);
  }
};

export default conectarDB;