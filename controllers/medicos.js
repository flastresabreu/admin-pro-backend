const {response} = require('express');
const Medico = require('../model/medicos'); 

const getMedicos = async (req, res = response) => {

    try {
        
        const medicos = await Medico.find()
                                    .populate('usuario', 'nombre img')
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

const getMedicoById = async(req, res = response) => {
    try {
        const uid = req.params.id;
        const medico = await Medico.findById(uid);

        res.status(200).json({
            ok: true,
            medico: medico
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado contacte con el administrador'
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

const actualizarMedicos = async (req, res = response) => {

    try {

        const uid = req.params.id;

        const medicoDb = await Medico.findById(uid);

        if(!medicoDb){
            return res.status(404).json({
                ok: false,
                msg: 'No existe medico con ese id'
            })
        }

        const medicoCambios = {
            ... req.body
        }

        const medicosActualizados = await Medico.findByIdAndUpdate(uid, medicoCambios, {new:true});

        res.status(200).json({
            ok: true,
            resultado: medicosActualizados
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            mg: 'Error inesperado contacte con el administrador'
        })
    }
   
}

const eliminarMedicos = async (req, res = response) => {

    try {
        
        const uid = req.params.id;

        const medicoDB = await Medico.findById(uid);

        if(!medicoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe medico con ese id'
            })
        }

        await Medico.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Medico eliminado satisfactoriamente'
        })


    } catch (error) {
        res.status(500).json({
        ok: false,
        msg: 'Error inesperado contacte con el administrador'
    })
    }

    
}

module.exports = {
    getMedicos,
    getMedicoById,
    crearMedicos,
    actualizarMedicos,
    eliminarMedicos
}