// obtenerTodo

const { response } = require("express");

const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const obtenerTodo = async (req, res) => {
  const busqueda = req.params.busqueda;
  const regExp = new RegExp(busqueda, "i"); // 'i' insensible, para que el valor no deba ser exacto para aparecer. es como un like %'busqueda'%

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regExp }),
    Medico.find({ nombre: regExp }),
    Hospital.find({ nombre: regExp }),
  ]);

  res.json({
    ok: true,
    usuarios: usuarios,
    medicos: medicos,
    hospitales: hospitales,
  });
};

const obtenerEntidadesColeccion = async (req, res) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regExp = new RegExp(busqueda, "i"); // 'i' insensible, para que el valor no deba ser exacto para aparecer. es como un like %'busqueda'%
  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regExp })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre");
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regExp }).populate(
        "usuario",
        "nombre img"
      );
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regExp });
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser usuario/medicos/hospitales",
      });
  }

  res.json({
    ok: true,
    tabla: tabla,
    resultados: data,
  });
};

module.exports = {
  obtenerTodo,
  obtenerEntidadesColeccion,
};
