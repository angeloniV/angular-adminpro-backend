const { Schema, model } = require("mongoose");

const MedicoSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
      type: Schema.Types.ObjectId, // esto le dice a MongoDB de que va a tener una referencia con usuario
      ref: 'Usuarios',  // nombre con el que se creó el esquema
      required: true
  },
  hospital: {
      type: Schema.Types.ObjectId, // esto le dice a MongoDB de que va a tener una referencia con usuario
      ref: 'Hospital',  // nombre con el que se creó el esquema
      required: true
  }
});

MedicoSchema.method("toJSON", function () {
  // aqui abajo van los campos que no quiero que se muestren cuando se haga toJSON del usuario
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = model("Medicos", MedicoSchema);
