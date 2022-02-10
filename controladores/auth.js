const { response } = require('express')
const Usuario = require('../modelos/Usuario')

const registrar = async (req, res = response) => {
    //console.log(req.body)
   // const {nombre, email, password} = req.body
    
    try {
        const usuario = new Usuario(req.body)
        console.log(usuario)
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

module.exports={ registrar }