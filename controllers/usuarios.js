const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryp = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const obtenerUsuarios = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0; // si el parametro no viene, utiliza el 0.
  const limite = Number(req.query.limite) || 10;

  const [usuarios, total] = await Promise.all([
    // ejecuta todas estas promesas. Esto devuelve un arreglo donde la primera posicion corresponde al primer sevicio, etc.
    Usuario.find({}, "nombre email role google img") // asi pongo los datos que quiero que muestre
      .skip(desde) // cantidad de objetos que salta
      .limit(limite), // cantidad de resultados

    Usuario.countDocuments(), // total de registros en la tabla
  ]);

  res.json({
    ok: true,
    usuarios,
    uid: req.uid, // campo que lo toma del middleware validarJWT que lo carga.
    total: total,
  });
};

const crearUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }

    const usuario = new Usuario(req.body);
    // espera a que esto termine para continuar. Para que funcione la funcion debe ser async

    // Encriptar contraseña
    /* un numero o data generada de manera aleatoria de tal manera que nos ayude a encriptarla y 
    ni siquiera sepamos que proceso o procedimiento usamos para encriptarlo*/
    const salt = bcryp.genSaltSync();
    usuario.password = bcryp.hashSync(password, salt);

    // Guardar usuario
    const usuarioDB = await usuario.save();

    // Generar el TOKEN - JWT
    const token = await generarJWT(usuario._id);

    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  //TODO Validar token y comprobar si es el usuario correcto

  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    const { password, google, email, ...campos } = req.body; // asi desarmo el body y me quedo con password, google y email como variables con sus valores

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email: email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    campos.email = email;
    // Actualizacion
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true, //para que me devuelva el nuevo objeto actualizado
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Usuario eliminado",
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
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
