import mongoose from 'mongoose'
import CategoryModel from '../models/CategoryModel.js'
import ProductModel from '../models/ProductModel.js'
import { generateCategoryId } from '../utils/GenerateId.js'

// Create a new category: POST - /api/category/create
export const createCategory = async(req,res) => {
    try {
        const { name, image } = req.body

        if(!name || !image) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'All fields are required'
            })
        }

        // Check if category name exists
        const categoryExists = await CategoryModel.findOne({ name })
        if(categoryExists) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Category already exists'
            })
        }

        const categoryId = await generateCategoryId()

        // Create new category
        const newCategory = await CategoryModel.create({
            categoryId, 
            name, 
            image 
        })
 
        // Send response
        res.status(201).json({
            success: true,
            error: false,
            message: 'Category created successfully',
            data: newCategory
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: true, 
            message: error.message
        })
    }
}

// Get all categories: GET - /api/category/all-categories
export const getAllCategories = async(req,res) => {
    try {
        // Create a query to paginate the categories, count the total number of categories, and search for categories
        let { page, limit, search } = req.body

        // Check if page and limit are provided
        if(!page) {
            page = 1
        }

        if(!limit) {
            limit = 10
        }

        // Check if search is provided
        // Finding nearly categories based on category name
        const query = search ? {
            name: {
                $regex: search,
                $options: 'i' // Case-insensitive
            }
        } : {}

        // Calculate the skip page
        const skipPage = (page - 1) * limit

        // Get all categories
        const [data, totalPageCount] = await Promise.all([
            CategoryModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skipPage)
                .limit(limit),
            CategoryModel.countDocuments(query)
        ])

        // Send response
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Get all categories successfully',
            data: data,
            totalCategoryCount: totalPageCount,
            totalNumberPage: Math.ceil(totalPageCount / limit)
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: true, 
            message: error.message
        })
    }
}

// Get category by id: GET - /api/category/get-category/:id
export const getCategoryById = async(req,res) => {
    try {
        const { id } = req.params

        // Check category id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Invalid category id'
            })
        }

        // Get category by id
        const getCategoryById = await CategoryModel.findById(id)

        // Send response
        res.status(200).json({
            success: true,
            error: false,
            message: 'Category fetched successfully',
            data: getCategoryById
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: true, 
            message: error.message
        })
    }
}

// Update category by id: PUT - /api/category/update-category/:id
export const updateCategory = async(req,res) => {
    try {
        const { id } = req.params
        const { name, image, isDisplayed } = req.body

        // Check category id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Invalid category id'
            })
        }

        // Update category by id
        const updateCategory = await CategoryModel.findByIdAndUpdate(id, {
            name,
            image,
            isDisplayed
        })

        // Send response
        res.status(200).json({
            success: true,    
            error: false,
            message: 'Category updated successfully',
            data: updateCategory
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: true, 
            message: error.message
        })
    }
}

// Delete category by id: DELETE - /api/category/delete-category/:id
export const deleteCategory = async(req,res) => {
    try {
        const { id } = req.params

        // Check category id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Invalid category id'
            })
        }

        // Check if category has products
        const checkProduct = await ProductModel.countDocuments({ category: id })

        // If category has products => cannot delete
        if(checkProduct > 0) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Category has products, cannot delete'
            })
        }

        // Delete category by id
        const deleteCategory = await CategoryModel.findByIdAndDelete(id)

        // If category not found
        if(!deleteCategory) {
            return res.status(404).json({
                success: false,
                error: true, 
                message: 'Category not found'
            })
        }

        // Send response
        res.status(200).json({
            success: true,
            error: false,
            message: 'Category deleted successfully',
            data: deleteCategory
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: true, 
            message: error.message
        })
    }
}