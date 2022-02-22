/*  Medicos
    ruta: /api/medicos
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");

const { validarJWT } = require("../middleware/validar-token");

const {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos");

const router = Router();

router.get("/", validarJWT, obtenerMedicos);

// path, middleware(funciones que se ejecutan antes de otra, como interceptors), funcion del controlador
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del medico es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe de ser válido").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

router.put("/:id", [], actualizarMedico);

router.delete("/:id", validarJWT, borrarMedico);

module.exports = router;
