const Carrito = require('../handlers/carrito')
const Producto = require('../handlers/productos')

const carrito = new Carrito('carritos.txt')
const productos = new Producto('productos.txt')

const createCar = async(req, res) =>{
    const id = await carrito.create()

    res.status(201).json({ message: 'Carrito creado ', id})
}

const deleteCar= async(req, res) =>{
    const message = await carrito.delete(req.params.id)

    if(message === null){
        return res.status(200).json({ message: 'El Carrito no existe'})
    }

    res.status(200).json({ message })
}

const addProduct = async(req, res) =>{
    const { idProducto } = req.body

    if(idProducto === null){
        return res.status(404).json({ message: 'Error en la petición del producto' })
    }

    const producto = await productos.getById(idProducto)

    if(producto === null) return res.status(404).json({ message: 'El producto no existe' })

    const message = await carrito.addProduct(req.params.id, producto)

    res.status(200).json({ message })
}

const  getProductsCar = async(req, res) =>{
    const productos = await carrito.getAll(req.params.id)

    if(productos === null){
        return res.status(404).json({ message: `No existe el carrito con id ${req.params.id}`})
    }
    if(productos === 0){
        return res.status(404).json({ message: 'No hay productos'})
    }

    res.status(200).json({ productos })
    
}

const deleteProductoCar = async(req, res) =>{
    const  message = await carrito.deleteProduct(req.params.id, req.params.idProducto)

    if(message === null){
        return res.status(404).json({ message: 'No existe el carrito'})
    }

    if(message === 0){
        return res.status(404).json({ message: `No existe el producto con id ${req.params.idProducto} en el carrito` })
    }

    res.status(200).json({ message })
}


module.exports = {
    createCar,
    deleteCar,
    addProduct,
    getProductsCar,
    deleteProductoCar
}