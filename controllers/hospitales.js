const { response } = require("express");
const Hospital = require("../models/hospital");

const obtenerHospitales = async (req, res) => {

  const hospitales = await Hospital.find().populate("usuario", "nombre");

  res.json({
    ok: true,
    hospitales: hospitales
  });
};

const crearHospital = async (req, res) => {
  // como ya pase por el middleware de autenticacion de verificacion de JWT ya tengo el uid del usuario
  const uid = req.uid;

  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hubo un error",
    });
  }
};

const actualizarHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "actualizarHospital",
  });
};

const borrarHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "borrarHospital",
  });
};

module.exports = {
  obtenerHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
