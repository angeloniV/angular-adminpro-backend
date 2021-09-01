const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryp = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no válido",
      });
    }

    // Verificar contraseña
    const passwordValido = bcryp.compareSync(password, usuarioDB.password);
    if (!passwordValido) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no válido",
      });
    }

    // Si llega a este punto es porque el email y el password son validos, entonces debemos generar el TOKEN - JWT
    const token = await generarJWT(usuarioDB._id);

    res.json({
      ok: true,
      token: token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  login,
};
