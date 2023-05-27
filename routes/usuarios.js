/*
    Rutas /api/usuarios
*/

const { Router } = require('express');
const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios');
const {check} = require('express-validator');
const {validarCampos} = require('../middelwares/validar-campos');
const { validarJWT } = require('../middelwares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    check('password', 'El nombre es password').not().isEmpty(),
                    check('email', 'El nombre es email').isEmail(),
                    validarCampos
                ]
,crearUsuario);

router.put('/:id',[
                    validarJWT,
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    check('password', 'El nombre es password').not().isEmpty(),
                    check('role', 'El role es obligatorio').not().isEmpty(),
                    validarCampos
                  ],
 actualizarUsuario);

 router.delete('/:id', validarJWT, borrarUsuario);
    



module.exports = router
