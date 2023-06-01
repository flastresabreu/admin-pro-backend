/*
    Rutas /api/hospitales
*/

const { Router } = require('express');
const { getMedicos, crearMedicos, actualizarMedicos, eliminarMedicos} = require('../controllers/medicos')
const {check} = require('express-validator');
const {validarCampos} = require('../middelwares/validar-campos');
const { validarJWT } = require('../middelwares/validar-jwt');


const router = Router();

router.get('/', getMedicos);

router.post('/', [
                    validarJWT,
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    check('hospital', 'El hospital debe ser un id valido').isMongoId(),
                    validarCampos
                ]
,crearMedicos);

router.put('/:id',[
                    validarJWT,
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    check('hospital', 'El hospital debe ser un id valido').isMongoId(),
                    validarCampos
                  ],
 actualizarMedicos);

 router.delete('/:id', validarJWT, eliminarMedicos);
    



module.exports = router
