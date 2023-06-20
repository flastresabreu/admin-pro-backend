
const { response } = require('express');
const Usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');
const usuario = require('../model/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde || 0);
    
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email img role google')
                                    .skip(desde)
                                    .limit(10),
        Usuario.countDocuments()                            
    ])

    res.json({
        ok: true,
        usuarios,
        total
    });
};

const crearUsuario = async(req, res = response) => {

    const {nombre, password, email} = req.body;

    try {
        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);

        //Encripta contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        //Generar Token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        })
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario por ese id'
            })
        }

        //TODO: Validar token y si es el usuario correcto
        const {password, google, email,...campos} = req.body;

        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe usuario con ese email'
                })
            }
        }
        if(!usuarioDB.google){
            campos.email = email;
        }
        else if(usuarioDB.email !== email){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            })
        }
       
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});

        res.status(200).json({
        ok: true,
        usuarioActualizado
    })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
    
}

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe en el sistema',
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado hable con el administrador'
        })
    }


}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}