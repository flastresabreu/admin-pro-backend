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

const actualizarHospitales = async (req, res = response) => {

    try {

        const uid = req.params.id;
        const hospitalDb = await Hospital.findById(uid);

        if(!hospitalDb){
            return res.status(404).json({
                ok: false,
                msg: 'No existe hospital con ese id'
            })
        }

        const hospitaCambios = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(uid, hospitaCambios, {new:true})

        res.status(200).json({
            ok: true,
            msg: `Hospital ${uid} fue actualizado`,
            hospital: hospitalActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado contacte con el administrador'
        })
    }
}

const eliminarHospitales = async (req, res = response) => {

    try {

        const uid = req.params.id;

        const hospitalDb = await Hospital.findById(uid);

        if(!hospitalDb){
            return res.status(404).json({
                ok: true,
                msg: `No se encontro hospital con ese id`
            })
        }

        await Hospital.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado',
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado contacte con el administrador'
        })
    }
    
}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    eliminarHospitales
}