const jwt = require('jsonwebtoken')

const validarToken = (req, res, next) => {
    const token = req.header('x-token')
   // console.log(token);
    //comprobamos si hay errores
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no existe token',
           
        })
    }
    try {
        jwt.verify(token, process.env.PRIVATE_KEY, (err, token) => {
            //console.log(token)
            if (err) {
                throw err
            }
            req.id = token.id
            req.nombre = token.nombre
            
        })
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token erróneo',
           
        })
    }
    

    //no hay errores
    next()
}

module.exports = { validarToken }