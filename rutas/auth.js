const { Router } = require('express')
const { registrar, loguear, renovarToken } = require('../controladores/auth')
const { check } = require('express-validator')
const { validar } = require('../middleware/validacion')
const { validarToken } = require('../middleware/validar-jwt')
const router = Router()


router.get('/',  (req, res) => {
    res.send('Hello World')
})

router.post('/registro', 
    [
        check('nombre' , 'campo nombre no puede estar vacío').notEmpty(),
        check('email' , 'email debe ser un email válido').isEmail(),
        check('password' , 'la contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
        validar
    ],
registrar)

//creamos la ruta para el login
router.post('/login', 
    [
        check('email' , 'email debe ser un email válido').isEmail(),
        check('password' , 'la contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
        validar
    ],
loguear)
//renovar token, el cliente envía el token, el servidor valida token, genera de nuevo el token
//lo envía al cliente en una petición get (el token no viene en el body, viene 
//en las cabeceras)
router.get('/renew', validarToken, renovarToken)
module.exports = router