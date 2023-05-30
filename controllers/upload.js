const {response, request} = require('express');

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');

const fileUpload = async (req, res) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const validarTipos = ['usuarios', 'medicos', 'hospitales'];
    if(!validarTipos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'El tipo entrado no es valido, debe ser medicos, usuarios o hospitales'
        })
    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
      }
    
    //procesar la imagen..
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensioArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extenciones
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extensioArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'La extencion del archivo no es valida'
        })
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensioArchivo}`;

    //Path para guardar el archivo
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
              });
        }
          
        res.status(200).json({
            ok: true,
            msg: 'File uploaded!',
            nombreArchivo
        });
      });

    //actualizar imagen
    actualizarImagen(tipo, id, nombreArchivo);  

}

const retornaImagen = (req, res = response) => {
    try {
        const tipo = req.params.tipo;
        const imagen = req.params.imagen;

        const pathImagen = path.join(__dirname, `../uploads/${tipo}/${imagen}`);
        if(fs.existsSync(pathImagen)){
            res.sendFile(pathImagen); 
        }
        else{
            res.sendFile(path.join(__dirname, `../uploads/no-img.png`));
        }

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado contacte con el administrador'
        })
    }
}


module.exports = {
    fileUpload,
    retornaImagen
};