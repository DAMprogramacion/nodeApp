const jwt = require('jsonwebtoken')

const generarToken = (id, nombre) => {
    return new Promise ((resolve, reject) => {
        const payload = {id, nombre}
        jwt.sign( payload, process.env.PRIVATE_KEY, { expiresIn : '1h' }, (err, token) => {
            if (err) {
                console.log(err)
                reject('no se puede generar token')
            } else {
                resolve(token)
            }
          })
    })
}

module.exports = { generarToken }