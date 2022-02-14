const { response } = require('express')
bcrypt = require('bcryptjs')
const Usuario = require('../modelos/Usuario')
const salt = bcrypt.genSaltSync(10)
const registrar = async (req, res = response) => {
    //console.log(req.body)
    const { email, password } = req.body
    
    try {
       // const usuario = new Usuario(req.body)
        let usuario = await Usuario.findOne({ email })
        //console.log(usuario)
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'usuario ya existe'
            })
        }
        usuario = new Usuario(req.body)
        //cifrar la contraseña
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save()
        return res.status(201).json({
            ok: true,
            msg: 'registro',
            nombre: usuario.nombre,
            email: usuario.email
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error de servidor',
            
        })
    }
    
    
    
}

//crear función loguear

module.exports={ registrar }