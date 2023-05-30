const {response} = require('express');
const Medico = require('../model/medicos'); 

const getMedicos = async (req, res = response) => {

    try {
        
        const medicos = await Medico.find()
                                    .populate('usuario', 'nombre')
                                    .populate('hospital', 'nombre');

        res.status(200).json({
            ok: true,
            medicos: medicos
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado contacte con el administrador"
        })
    }
    
}

const crearMedicos = async(req, res = response) => {

    const uid = req.uid;

    try {

        const medico = new Medico({
            usuario: uid,
            ...req.body
        });

        const medicoDB = await medico.save();
        
        res.status(200).json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado contacte con el administrador'
        })
    }
    
}

const actualizarMedicos = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'actualizarMedicos'
    })
}

const eliminarMedicos = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'eliminarMedicos'
    })
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    eliminarMedicos
}