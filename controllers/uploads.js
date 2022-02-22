const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const { response } = require("express");
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const { fstat } = require("fs");

const fileUpload = (req, res = response) => {
  const tipo = req.params.entidad;
  const id = req.params.id;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es para una entidad conocida: hospital ni medico ni usuario",
    });
  }

  // Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo para subir",
    });
  }

  // Procesar la imagen
  const file = req.files.imagen;
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Validar extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extension permitida",
    });
  }

  // Generar el nombre del archivo
  const nombreArchivo = uuidv4().concat(".").concat(extensionArchivo);

  // Path para guardar la imagen
  const path = "./uploads/".concat(tipo).concat("/").concat(nombreArchivo);

  // Use the mv() method to place the file somewhere on your server
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }

    // Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msg: "Archivo subido ".concat(nombreArchivo),
    });
  });
};

const retornaImagen = (req, res) => {
  const tipo = req.params.entidad;
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, "../uploads/" + tipo + "/" + foto);

  // Imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  }else{
    res.sendFile(path.join(__dirname, "../uploads/no_imagen_available.jpg"));
  }
};

module.exports = {
  fileUpload,
  retornaImagen,
};
