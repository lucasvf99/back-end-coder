import { Router } from "express";
import CartManager from "../services/cartsManager.js";

const router = Router()

const cartManager =  new CartManager()

//Post
router.post('/', async (req,res) => {
    try {
        const cart = await cartManager.addCarts()

        res.json({status:"success", cart:cart})
    } catch (error) {
        console.log(error)
    }
})

//get id 
router.get('/:cId', async (req,res)=>{
    try {
        const cartId = req.params.cId
        const cart = await cartManager.getCartId(cartId)
        if(!cart){
            return res.status(400).send('No se encontro el carrito')
        }
        res.json(cart)
        
    } catch (error) {
        console.log(error)
    }
})


//post id 
router.post('/:cId/product/:pId', async (req,res)=>{
    try {
        const carritoId = req.params.cId
        const productId = req.params.pId
        
        
        const productoCarrito = await cartManager.addProduct(carritoId, productId)
        
        if(productoCarrito === null){
            return res.status(404).json({error:"Error al pasar los datos"})
        }

        res.send({status:"succes", carrito:productoCarrito})
    } catch (error) {
        console.log(error)
    }
})



//Post :cid/product/:pid


export default router