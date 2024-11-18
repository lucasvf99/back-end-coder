import { response, Router } from "express";
import ProductManager from "../services/productsManager.js";

const router = Router()

//ProductManager

const productManger = new ProductManager()


//get ponerle async porq trabajamos con archivos
router.get('/', async (req,res)=>{


    try{
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined
        const products = await productManger.getProducts(limit)

        if(products.length === 0){
            return res.send('No hay productos')
        }

        res.json(products)
    }
    catch(error){
        console.log(error)
    }
  
}) 

// get :id
router.get('/:pId', async (req,res)=>{
    try{
        const productId = req.params.pId 
        const product = await productManger.getProductsById(productId)
        
        if(!productId){
            return res.status(404).send('No se encontro el producto')
        }

        res.json(product)
       
    }
    catch (error){
        console.log(error)
    }
  
}) 


//post 
router.post('/', async (req,res)=>{

    try{
        let {title, description, code, price, stock, category, thumbnails} = req.body

        if(!title || !description || !code || !price || !stock || !category){
            return res.status(400).json({error:'Faltan datos excepto thumbnails'})
        }

        const newProduct = await productManger.addProduct({title, description, code, price, stock, category, thumbnails})

        res.status(201).json({status:'success', product:newProduct})
    }
    catch(error){
        console.log(error)
    }
   
})



//put
router.put('/:pId',  async(req, res) => {

   try{
    const pId = req.params.pId
    const upDateProdut = await productManger.upDateProduts(pId, req.body)

    if(upDateProdut){
        res.json(upDateProdut)
    }else{
        return res.status(404).json({error:'Producto no encontrado'})
    }

   }
   catch(error){
    console.log(error)
   }
} )



//delete
router.delete('/:pId',async (req,res)=>{
    try{
        let pId = req.params.pId
        const deletedProdcut = await productManger.deleteProdct(pId)

        if(deletedProdcut){
            res.json({status:"delete",product:deletedProdcut})
        }else{
            res.status(404).json({error:'Producto no encontrado'})
        }

    }
    catch(error){
        console.log(error)
    }
})


export default router