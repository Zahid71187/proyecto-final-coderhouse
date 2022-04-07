const express = require('express');
const { 
    saveProduct, 
    getAllProducts, 
    getProduct,
    updateProduct,
    deleteProduct } = require('../controllers/controllerProductos')

const routesProductos = express.Router()
const permissionsAdmin =  require('./middleware')

const admin = true

//consultar productos
routesProductos.get('/', getAllProducts)

//consultar producto
routesProductos.get('/:id', getProduct)

//agregar producto
routesProductos.post('/', permissionsAdmin(admin), saveProduct)

//actualizar productos
routesProductos.put('/:id', permissionsAdmin(admin), updateProduct)

//eliminar productos
routesProductos.delete('/:id', permissionsAdmin(admin), deleteProduct)

module.exports = routesProductos