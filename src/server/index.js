const express = require('express')
const routerProductos = require('../routes/routerProductos')
const routerCarrito = require('../routes/routerCarrito')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

app.use(function(req, res, next) {
    res.status(404)
    res.json({
        error : -2,
        descripcion :   'Ruta no encontrada'
    });
})

app.listen(PORT, () => {
    console.log(`Corriendo  en el puerto ${PORT}`)
})

app.on('error', (err) => console.log(`Error en el servidor: ${err.message}`))

module.exports = app
