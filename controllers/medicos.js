const { response } = require("express");

const Medico = require("../models/medico");

const obtenerMedicos = async (req, res) => {

  const medicos = await Medico.find()
                              .populate("usuario", "nombre")
                              .populate("hospital", "nombre");

  res.json({
    ok: true,
    medicos: medicos
  });
};

const crearMedico = async (req, res) => {
  
  // como ya pase por el middleware de autenticacion de verificacion de JWT ya tengo el uid del usuario
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body
  });


  try {

    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB,
      msg: "crearMedico",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarMedico = (req, res) => {
  res.json({
    ok: true,
    msg: "actualizarMedico",
  });
};

const borrarMedico = (req, res) => {
  res.json({
    ok: true,
    msg: "borrarMedico",
  });
};

module.exports = {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
