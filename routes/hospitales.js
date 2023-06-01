/*
    Rutas /api/hospitales
*/

const { Router } = require('express');

const {check} = require('express-validator');
const {validarCampos} = require('../middelwares/validar-campos');
const { validarJWT } = require('../middelwares/validar-jwt');
const { getHospitales, crearHospitales, actualizarHospitales, eliminarHospitales } = require('../controllers/hospitales');

const router = Router();

router.get('/', validarJWT, getHospitales);

router.post('/', [
                    validarJWT,
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    validarCampos
                ]
,crearHospitales);

router.put('/:id',[
                   validarJWT,
                   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    validarCampos
                  ],
 actualizarHospitales);

 router.delete('/:id', validarJWT, eliminarHospitales);
    



module.exports = router
