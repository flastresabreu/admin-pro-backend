const {response} = require('express');
const Hospital = require('../model/hospital');

const getHospitales = async (req, res = response) => {

    try {

        const hospitales = await Hospital.find()
                                            .populate('usuario', 'nombre img');
        
        res.status(200).json({
            ok: true,
            msg: hospitales
        })

    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado comtacte con el administrador'
        })
    }
    
}

const crearHospitales = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    

    try {

        const hospitaldb = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitaldb
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado contacte con el administrador'
        })
    }

}

const actualizarHospitales = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'actualizarHospitales'
    })
}

const eliminarHospitales = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'eliminarHospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    eliminarHospitales
}