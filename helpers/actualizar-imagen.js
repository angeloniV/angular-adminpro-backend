const fs = require("fs"); // file service

const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");
const { path } = require("express/lib/application");

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path); // borramos la imagen
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = "";

  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        return false;
      }

      pathViejo = "./uploads/medicos/".concat(medico.img);
      borrarImagen(pathViejo);

      medico.img = nombreArchivo;
      await medico.save();
      return true;
      break;
    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return false;
      }

      pathViejo = "./uploads/hospitales/".concat(hospital.img);
      borrarImagen(pathViejo);

      hospital.img = nombreArchivo;
      await hospital.save();
      return true;

      break;
    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return false;
      }

      pathViejo = "./uploads/usuarios/".concat(usuario.img);
      borrarImagen(pathViejo);

      usuario.img = nombreArchivo;
      await usuario.save();
      return true;

      break;

    default:
      break;
  }

  console.log("vamos bien");
};

module.exports = {
  actualizarImagen,
};
