import Usuario from "../models/Usuario.js";

import bcrypt from "bcryptjs";

import generarJWT from "../utils/generarJWT.js";


// Registrar usuario

export const registrarUsuario = async (req, res) => {

  try {

    const {

      nombre,

      email,

      password,

      rol

    } = req.body;


    const existeUsuario =

      await Usuario.findOne({

        email

      });


    if (existeUsuario) {

      return res.status(400).json({

        mensaje: "El usuario ya existe"

      });

    }


    const salt =

      await bcrypt.genSalt(10);


    const passwordHash =

      await bcrypt.hash(

        password,

        salt

      );


    const usuario =

      await Usuario.create({

        nombre,

        email,

        password: passwordHash,

        rol

      });


    res.status(201).json({

      _id: usuario._id,

      nombre: usuario.nombre,

      email: usuario.email,

      rol: usuario.rol,

      token: generarJWT(

        usuario._id

      )

    });

  }

  catch (error) {

    res.status(500).json({

      mensaje: error.message

    });

  }

};


// Login

export const loginUsuario = async (req, res) => {

  try {

    const {

      email,

      password

    } = req.body;


    const usuario =

      await Usuario.findOne({

        email

      });


    if (

      usuario &&

      (

        await bcrypt.compare(

          password,

          usuario.password

        )

      )

    ) {

      res.json({

        _id: usuario._id,

        nombre: usuario.nombre,

        email: usuario.email,

        rol: usuario.rol,

        token: generarJWT(

          usuario._id

        )

      });

    }

    else {

      res.status(401).json({

        mensaje:

          "Credenciales incorrectas"

      });

    }

  }

  catch (error) {

    res.status(500).json({

      mensaje: error.message

    });

  }

};