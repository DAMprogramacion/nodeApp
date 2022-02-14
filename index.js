const express = require('express')
require('dotenv').config()
const { conectar } = require('./database/config')
conectar()
const auth = require('./rutas/auth')

const app = express()

//para lectura y escritura de json
app.use(express.json())
//gestión rutas de usuarios
app.use('/app/usuarios', auth)

const PORT = process.env.PORT || 3000  
app.listen(PORT, () => console.log(`Servidor abierto en puerto ${PORT}`))