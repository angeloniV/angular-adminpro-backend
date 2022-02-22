/*
 rutas : api/todo/:busqueda
 */

const { Router } = require("express");
const { obtenerTodo, obtenerEntidadesColeccion } = require("../controllers/busquedas");
const { validarJWT } = require("../middleware/validar-token");

const router = Router();

router.get("/:busqueda", validarJWT, obtenerTodo);
router.get("/coleccion/:tabla/:busqueda", validarJWT, obtenerEntidadesColeccion);

module.exports = router;
