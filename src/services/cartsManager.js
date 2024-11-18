import fs from 'fs/promises'
import path from 'path'
import { pid } from 'process';
import { v4 as uuidv4 } from 'uuid';

//cart
const fileCarts = path.resolve('data','carts.json')
//product
const fileProducts = path.resolve('data', 'products.json') 


export default class  CartManager {

    constructor (){
        this.carts = []
        this.init()

        this.products= []
        this.init()
    }

    async init (){
        try{
            //carts
            const data = await fs.readFile(fileCarts, 'utf-8')
            this.carts =  JSON.parse(data)

            //products
            const dataP = await fs.readFile(fileProducts, 'utf-8')
            this.products =  JSON.parse(dataP)

        }
        catch(error){
            console.log(error)
            this.carts = []
        }
    }

    async saveFile(){
        const jsonData = JSON.stringify(this.carts, null, 2)
        await fs.writeFile(fileCarts, jsonData)
    }

    // crear carrito 
    async addCarts () {

        const newCart = {
            id: uuidv4(),
            products : []
        }

        this.carts.push(newCart)

        this.saveFile()

        return newCart
    }

    //obtener carrito x id
    async getCartId(id){
            return this.carts.find(c => c.id === id)
    }

    //agregar producto al carrito x id
    async addProduct (cId, pId ){

        const carrito = this.carts.find(c => c.id === cId)
        const product = this.products.find(p=> p.id === pId)

        console.log(cId, pId)

        if(!product || !carrito ) return null

        const pCarrito = carrito.products.find(p => p.id === pId)

        if(pCarrito){
           pCarrito.quantity ++
        }else{
            const newProduct = {
                productId: product.id,
                quantity:1,
            }
            carrito.products.push(newProduct)
        }

        

        this.saveFile()

        return carrito

    }

}


