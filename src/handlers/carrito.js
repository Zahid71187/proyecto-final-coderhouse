const fs = require('fs')
const { parse } = require('path')

 class Carrito {

    constructor(archivo){
        this.archivo = archivo
    }

    async create(){
        try {
            let carritos
            let carritoNuevo = {}

            // valida que el archivo existe o en su caso debe crearlo
            const archivos = await fs.promises.readdir('./')
            if(!archivos.includes(this.archivo)){
                await fs.promises.writeFile(`./${this.archivo}`, '[]')
            }

            // lee los datos del archivo
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            
            if(datos !== '') {
                carritos = JSON.parse(datos)
            } 
            else{
                carritos = []
            }
            
            if(carritos.length !== 0){
                let id
                carritos.forEach( carrito => {
                    id = carrito.id
                })
                id++
                carritoNuevo.id = id
            } else{
                carritoNuevo.id = 1
            }
            carritoNuevo.timestamp = Date.now()
            carritoNuevo.productos = []

            carritos.push(carritoNuevo)
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(carritos))
            console.log('Carrito creado')
            return carritoNuevo.id
        }
        catch(e) {
            return 'Se produjo un error: ' + e
        }
    }

    async getAll(id){
        try{
            let productos
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            if(datos === '') return null
            datos = JSON.parse(datos)
            productos = datos.filter( carrito => parseInt(carrito.id) === parseInt(id))

            if(productos.length === 0) return null 

            productos = productos[0].productos

            if(productos.length === 0) return 0

            return productos
        }
        catch(e){
            return 'Ocurrió un error: ' + e
        }
    }

    async addProduct(id, producto){
        try{
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            if(datos === '') return null
            datos = JSON.parse(datos)
            console.log('Paso 1')
            console.log(datos)
            let carritos = datos.filter( carrito => parseInt(carrito.id) === parseInt(id) )
            
            if(carritos.length ===0 ){
                console.log(`El carrito con id ${id} no existe`)
                return `El carrito con id ${id} no existe`
            }
            console.log('Paso 2')

            carritos = datos.map( carrito => {
                if(parseInt(carrito.id) === parseInt(id)){
                    carrito.productos.push(producto)
                }
                return carrito
            })

            console.log(carritos)
             await fs.promises.writeFile(`./${this.archivo}` , JSON.stringify(carritos))
            console.log(`Producto agregado al carrito ${id}`)

            return `Producto agregado al carrito ${id}`
        }
        catch(e){
           return 'Ocurrio un error en la actualización: ', e
        }
    }

    async delete(id){
        try{
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            if(datos === '') return null
            datos = JSON.parse(datos)
            let carritos = datos.filter( carrito => parseInt(carrito.id) === parseInt(id))
            
            if(carritos.length ===0 ){
                console.log(`El carrito con id ${id} no existe`)
                return null
            }

            carritos = datos.filter( carrito => parseInt(carrito.id) !== parseInt(id))
            await fs.promises.writeFile(`./${this.archivo}` , JSON.stringify(carritos))
            console.log('Carrito eliminado')
            return 'Carrito eliminado'
        }
        catch(e){
           return 'Ocurrio un error en la eliminación: ', e
        }
    }

    async deleteProduct(id, idProducto){
        try{
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            if(datos === '') return null
            datos = JSON.parse(datos)
            let carritos = datos.filter( carrito => parseInt(carrito.id) === parseInt(id))
            
            if(carritos.length ===0 ){
                console.log(`El carrito con id ${id} no existe`)
                return null
            }

            let producto = carritos[0].productos.filter( producto => parseInt(producto.id) === parseInt(idProducto))

            if(producto.length === 0 ){
                console.log(`El producto con id ${idProducto} no existe`)
                return 0
            }

            carritos = datos.filter( carrito => {
               carrito.productos = carrito.productos.filter( producto => parseInt(producto.id) !== parseInt(idProducto))  
               return carrito  
            })

            await fs.promises.writeFile(`./${this.archivo}` , JSON.stringify(carritos))
            console.log('Carrito eliminado')
            return 'Producto eliminado'
        }
        catch(e){
           return 'Ocurrio un error en la eliminación: ', e
        }
    }
}

module.exports = Carrito
