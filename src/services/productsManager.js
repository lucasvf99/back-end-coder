import fs from 'fs/promises'
import path from 'path'
//id
import { v4 as uuidv4 } from 'uuid';

//crear archivo 
const fileProducts = path.resolve('data', 'products.json') // busca en la carpeta data el archivo products.json 

export default class ProductManager {
    //constructor 
    constructor (){
            this.products = []
            this.init()
    }

    //levanta el archivo json
    async init (){
        try{
            const data = await fs.readFile(fileProducts, 'utf-8')
            this.products =  JSON.parse(data) // agrego la data al array products
        }
        catch(error){
            console.log(error)
            this.products = []
        }
    }

    //*** METODOS ***

    //saveFile 
    async saveFile(){
        const jsonData = JSON.stringify(this.products, null, 2)
        await fs.writeFile(fileProducts, jsonData)
    }

    //obtener products
   async  getProducts (limit ){
        if(limit){
            return this.products.slice(0,limit) // slice retorna una copia 
        }
        return this.products;
    }

    //obtener product por id 
   async getProductsById(id){
       return this.products.find(p => p.id == id)
    }

    //agregar producto 
    async addProduct(product){

        const newProduct = {
            id: uuidv4(),
            ...product, // generar copia
            status: true
        }
        
        this.products.push(newProduct)

        //guardar en el archivo
        this.saveFile()

        return newProduct
    }


    //actualizar producto 

    async upDateProduts(id, upDateFile){

        let index = this.products.findIndex(p => p.id === id )

        if(index === -1 ) return null

        const upDateProduct = { // pisa la informacion que tenia 
            ...this.products[index],
            ...upDateFile,
            id: this.products[index].id 
        }

        this.products[index] = upDateProduct

        this.saveFile()

        return upDateProduct
    }

    //eliminar producto 

    deleteProdct(id){
        let index = this.products.findIndex(p => p.id === id )

        if(index === -1 ) return null

        const deletedProdcut =  this.products.splice(index, 1)

        this.saveFile()

        return deletedProdcut[0]
    }

}