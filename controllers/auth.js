const { response } = require('express');
const Usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');
const usuario = require('../model/usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res = response) => {

    const {email, password} = req.body

    try {
        //Verificar Email
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese usuario en el sistema'
            });
        }

        //Verificar contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validarPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            email,
            password, 
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error inesperado contacte con el administrador'
        })
    }

}

module.exports = {
    login
}