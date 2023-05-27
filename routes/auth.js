/*
    Rutas /api/login
*/

const {Router} = require('express');
const {login} = require('../controllers/auth')
const {check} = require('express-validator');
const { validarCampos } = require('../middelwares/validar-campos');

const router = Router();

router.post('/', [
                    check('password', 'El nombre es password').not().isEmpty(),
                    check('email', 'El nombre es email').isEmail(),
                    validarCampos
                ], login);

module.exports = router;