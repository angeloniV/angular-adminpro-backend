const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.method('toJSON', function () {
  // aqui abajo van los campos que no quiero que se muestren cuando se haga toJSON del usuario
  const { __v, __id,password, ...object } = this.toObject();

  object.uid = __id;

  return object;
});

module.exports = model('Usuarios', UsuarioSchema);
