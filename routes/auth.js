/*
    Rutas /api/login
*/

const {Router} = require('express');
const {login, googleSignIn, reNew} = require('../controllers/auth')
const {check} = require('express-validator');
const { validarCampos } = require('../middelwares/validar-campos');
const { validarJWT } = require('../middelwares/validar-jwt');

const router = Router();

router.post('/', [
                    check('password', 'El nombre es password').not().isEmpty(),
                    check('email', 'El nombre es email').isEmail(),
                    validarCampos
                ], login);

router.post('/google',
                 [
                    check('token', 'El token es obligatorio').not().isEmpty(),     
                    validarCampos
                ], googleSignIn);    
                
router.get('/renew',
                [
                   validarJWT
               ], reNew);                  

module.exports = router;