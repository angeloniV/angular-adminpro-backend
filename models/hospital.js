const { Schema, model } = require("mongoose");

const HospitalSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    usuario: {
      required: true,
      type: Schema.Types.ObjectId, // esto le dice a MongoDB de que va a tener una referencia con usuario
      ref: "Usuarios", // nombre con el que se creó el esquema
    },
  },
  { collection: "hospitales" }
); // nombre de como quiero que aparezca en la base de datos

HospitalSchema.method("toJSON", function () {
  // aqui abajo van los campos que no quiero que se muestren cuando se haga toJSON del usuario
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = model("Hospital", HospitalSchema);
