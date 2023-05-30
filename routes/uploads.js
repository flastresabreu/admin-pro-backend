const {Router} = require('express');
const {validarJWT} = require('../middelwares/validar-jwt');
const {fileUpload, retornaImagen} = require('../controllers/upload');
const expressFileUpload = require('express-fileupload');


const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', [
                            validarJWT
                        ] , fileUpload);

router.get('/:tipo/:imagen', [validarJWT], retornaImagen)

module.exports = router;