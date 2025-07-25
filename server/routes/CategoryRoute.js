import express from 'express'
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/CategoryController.js'
import authUser from '../middleware/AuthUser.js'

const router = express.Router()

// For user
router.post('/all-categories', getAllCategories)
router.get('/get-category/:id', getCategoryById)

// For admin
router.post('/create', authUser, createCategory)
router.put('/update-category/:id', authUser, updateCategory)
router.delete('/delete-category/:id', authUser, deleteCategory)

export default router