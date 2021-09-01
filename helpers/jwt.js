const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    // solo vamos a usar el uid pero se pueden agregar mas campos
    const payload = {
      uid,
    };
    // Sign es para crear el jwt
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error no se pudo generar el JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports= {
    generarJWT
};