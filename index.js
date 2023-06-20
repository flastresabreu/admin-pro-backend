
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const {dbconnection} = require('./database/config');

const app = express();

//Configurar el CORS
app.use(cors());

//Carpeta publica
app.use( express.static('public') );

//Lectura y parseo del Body
app.use(express.json());

//Base Datos
dbconnection();

// console.log(process.env);

//franke
//1zTKY8cqo2flDZFb

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT);
})