const { response } = require('express')
const { generarToken } = require('../helpers/jwt')
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
        //generar token
        const token = await generarToken(usuario.id, usuario.nombre)
        return res.status(201).json({
            ok: true,
            msg: 'registro',
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error de servidor',
            
        })
    }
    
    
    
}

//crear función loguear
const loguear = async (req, res = response) => {
    const  { email, password } = req.body
    //console.log(email, password); 
    //buscar el usuario por email que llegay en el body
    let usuario = await Usuario.findOne({ email })
   // console.log(usuario)
    if(!usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'usuario NO existe'
        })
    }
    if (! bcrypt.compareSync(password, usuario.password) ) {
        return res.status(400).json({
            ok: false,
            msg: 'credenciales erróneas'
        })
    }
    //generar token
    const token = await generarToken(usuario.id, usuario.nombre)
    return res.status(400).json({
        ok: true,
        msg: 'usuario existe',
        token
    })
}
const renovarToken = async (req, res = response) => {
    const {id, nombre} = req
    const token = await generarToken(id, nombre)
    res.json({
        ok: true,
        token
    })
}
module.exports={ registrar, loguear, renovarToken }