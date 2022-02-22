require('dotenv').config(); // va a buscar archivos con extension env

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//mean_user -> mongo express angular node
//qhEnXX8Mu9O3Y4CO

//Crea el servidor express
const app = express();

// Configurar cors
app.use(cors());

//Base de datos
dbConnection();

// Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));
/*app.get('/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
});*/

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

