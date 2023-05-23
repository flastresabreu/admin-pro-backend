
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const {dbconnection} = require('./database/config');

const app = express();
app.use(cors());
//Base Datos
dbconnection();

console.log(process.env);

//franke
//1zTKY8cqo2flDZFb

//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola desde el get'
    });
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT);
})