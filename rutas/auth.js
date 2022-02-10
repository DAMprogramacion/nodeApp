const { Router } = require('express')
const { registrar } = require('../controladores/auth')
const { check } = require('express-validator')
const { validar } = require('../middleware/validacion')

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

module.exports = router