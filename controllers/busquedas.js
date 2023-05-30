
const {response, request} = require('express');
const Usuario = require('../model/usuario');
const Medico = require('../model/medicos');
const Hospital = require('../model/hospital');

const getTodo = async (req = request, res = response) => {
    try {
        
        const busqueda = req.params.busqueda;
        const regexp = new RegExp(busqueda, 'i');
        
        const [usuario, medico, hospital] = await Promise.all([
                                        Usuario.find({nombre: regexp}),
                                        Medico.find({nombre: regexp}),
                                        Hospital.find({nombre: regexp})
                                    ]);

        res.status(200).json({
            ok: true,
            msg: busqueda, 
            usuario: usuario,
            medico: medico,
            hospital: hospital
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado contacte con el administrador'
        })
    }
}


const getDocumentosColeccion = async (req = request, res = response) => {
    try {
        
        const busqueda = req.params.busqueda;
        const tabla = req.params.tabla;
        const regexp = new RegExp(busqueda, 'i');

        let data = [];
        switch(tabla){
            case 'usuario':
                data = await Usuario.find({nombre: regexp});
                
            break;
            case 'medico':
                data = await Medico.find({nombre: regexp})
                                            .populate('usuario', 'nombre img')
                                            .populate('hospital', 'nombre img');
                
            break;
            case 'hospital':
                data = await Hospital.find({nombre: regexp})
                                                .populate('usuario', 'nombre img');
                
            break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla debe ser usuarios, medicos o hospitales'
                })
        }
        
        res.status(200).json({
            ok: true,
            resultado: data
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
    getTodo,
    getDocumentosColeccion

}