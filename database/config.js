const mongoose = require('mongoose');

// await -> espere a que todo termine para devolver la promesa a dbConnection.

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true
            //,useCreateIndex: true
        });
        console.log("Conexion Db ok");
    }catch(error){
        console.log(error);
        throw new Error('Error a generar conexion a la Db');
    }
}

module.exports = {
    dbConnection
}