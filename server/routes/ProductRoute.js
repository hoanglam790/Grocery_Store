import express from 'express'
import authUser from '../middleware/AuthUser.js'
import { createProduct, 
    getAllProducts, 
    getProductById, 
    getProductByCategory,
    updateProduct, 
    deleteProduct } from '../controllers/ProductController.js'

const router = express.Router()

// For user
router.post('/all-products', getAllProducts)
router.get('/get-product/:id', getProductById)
router.get('/get-product-by-category/:id', getProductByCategory)

// For admin
router.post('/create-product', authUser, createProduct)
router.put('/update-product/:id', authUser, updateProduct)
router.delete('/delete-product/:id', authUser, deleteProduct)

export default router