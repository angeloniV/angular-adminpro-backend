/*  Hospitales
    ruta: /api/hospitales
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");

const { validarJWT } = require("../middleware/validar-token");

const {
  obtenerHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require("../controllers/hospitales");

const router = Router();

router.get("/", validarJWT, obtenerHospitales);

// path, middleware(funciones que se ejecutan antes de otra, como interceptors), funcion del controlador
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos
  ],
  crearHospital
);

router.put("/:id", [], actualizarHospital);

router.delete("/:id", validarJWT, borrarHospital);

module.exports = router;
