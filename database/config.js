const mongoose = require('mongoose')

const conectar = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Conectado a la BD')
    } catch (error) {
        console.log('Error de conexión')
        
    }
    
}

module.exports={ conectar }
