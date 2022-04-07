const Producto = require('../handlers/productos')

const productos = new Producto('productos.txt')

const saveProduct = async(req, res) => {
    const { nombre, descripcion, foto, precio, stock } =  req.body

    if(nombre === undefined || descripcion === undefined || foto === undefined || precio === undefined || stock === undefined){
        return res.status(404).json({ message: 'Error en la solicitud'})
    }

    const id = await productos.save({ nombre, descripcion, foto, precio, stock })
    res.status(201).json({ message: "Guardado correctamente", id })
}

const getAllProducts = async(req, res) => {
    const allProductos = await productos.getAll()

    if(allProductos === null){
        return res.status(200).json({ message: 'No hay productos registrados'})
    }

    res.status(200).json({ productos: allProductos })
}

const getProduct = async(req, res) => {
    const producto = await productos.getById(req.params.id)

    if(producto === null){
        return res.status(200).json({ message: 'No existe el producto '})
    }

    res.status(200).json({ producto , message: 'Encontrado'})
}

const updateProduct = async(req, res) => {
    const { nombre, descripcion, foto, precio, stock } =  req.body

    if(nombre === undefined || descripcion === undefined || foto === undefined || precio === undefined || stock === undefined){
        return res.status(404).json({ message: 'Error en la solicitud'})
    }

    const producto = await productos.updateById(req.params.id, { nombre, descripcion, foto, precio, stock } )
    res.status(200).json({ message: 'Actualizado' ,producto})
}

const deleteProduct =  async(req, res) => {
    const message = await productos.deleteById(req.params.id)

    if(message === null){
      return  res.status(200).json({ message: 'No existe el producto'})
    }

    res.status(200).json({ message })
}

module.exports = {
    saveProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}