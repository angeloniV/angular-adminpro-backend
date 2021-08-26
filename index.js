require('dotenv').config(); // va a buscar archivos con extension env

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//mean_user -> mongo express angular node
//0d1VPtTSSlXDpTXE

//Crea el servidor express
const app = express();

// Configurar cors
app.use(cors());

//Base de datos
dbConnection();

//console.log(process.env);

//Rutas
app.get('/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

