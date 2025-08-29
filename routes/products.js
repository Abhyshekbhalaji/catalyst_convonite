import express from 'express';
import { addProduct, getProductById } from '../controllers/productController.mjs';


const router= express.Router(); 

router.post('/products',addProduct);
router.get('/products/:id',getProductById);

export default router;