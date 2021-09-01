const { response } = require("express");
const { validationResult } = require("express-validator"); // resultado de la validacion del middleware

const validarCampos = (req, res = response, next) => {
  // al pasar por el check, que está en el routes, va a crear en el request un arreglo con todos los errores
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errores: errores.mapped(),
    });
  }

  next(); // para que continue el request
};

module.exports = {
  validarCampos,
};
