const express = require('express')
const { createCar,
    deleteCar,
    addProduct,
    getProductsCar,
    deleteProductoCar } = require('../controllers/controllerCarrito')

const routerCarrito = express.Router()

// consultar productos del carrito
routerCarrito.get('/:id/productos', getProductsCar)

//crear carrito
routerCarrito.post('/', createCar)

//agregar productos al carrito
routerCarrito.post('/:id/productos', addProduct)

//eliminar carrito
routerCarrito.delete('/:id', deleteCar)

//eliminar producto de carrito
routerCarrito.delete('/:id/productos/:idProducto', deleteProductoCar)

module.exports = routerCarrito