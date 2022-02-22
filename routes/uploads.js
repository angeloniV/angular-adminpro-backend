/*
 rutas : api/uploads/
 */

const { Router } = require("express");
const expressfileUpload = require("express-fileupload");

const { fileUpload, retornaImagen } = require("../controllers/uploads");
const { validarJWT } = require("../middleware/validar-token");

const router = Router();

router.use(expressfileUpload());

router.put("/:entidad/:id", validarJWT, fileUpload);
router.get("/:entidad/:foto", validarJWT, retornaImagen);

module.exports = router;
