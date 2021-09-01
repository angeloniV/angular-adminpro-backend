const jwt = require("jsonwebtoken");

// next es la funcion que llamo si todo sale ok
const validarJWT = (req, res, next) => {
  //Leer los headers
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid; // de esta manera le agregamos al req el uid y luego de ejecutar el middleware en la ruta llama a la funcion que sigue.
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
