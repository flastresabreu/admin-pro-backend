const { response } = require('express');
const Usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');
const usuario = require('../model/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async(req, res) => {

    try {

        const {email, name, picture} = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB){
            usuario = new Usuario({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }
        else{
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar usuario
        await usuario.save();

        //Generar token
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            email, nombre, picture,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'El token de google no es correcto'
        })
    }

}

const reNew = async (req, res= response) => {

    const uid = req.uid;

    //Generar el TOKEN - JWT
    const token = await generarJWT(uid);

    res.status(200).json({
        ok: true,
        uid,
        token
    })
}

module.exports = {
    login,
    googleSignIn,
    reNew
}