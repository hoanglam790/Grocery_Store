import mongoose from 'mongoose'
import CategoryModel from '../models/CategoryModel.js'

// Create a new category: POST /api/category/create
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

        // Create new category
        const newCategory = await CategoryModel.create({ 
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

// Get all categories: GET /api/category/all-categories
export const getAllCategories = async(req,res) => {
    try {
        let { page, limit, search } = req.body

        if(!page) {
            page = 1
        }

        if(!limit) {
            limit = 10
        }

        const query = search ? {
            name: {
                $regex: search,
                $option: 'i'
            }
        } : {}

        const skipPage = (page - 1) * limit

        const [data, totalPageCount] = await Promise.all([
            CategoryModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skipPage)
                .limit(limit),
            CategoryModel.countDocuments(query)
        ])

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

// Get category by id: GET /api/category/get-category-by-id
export const getCategoryById = async(req,res) => {
    try {
        const { id } = req.body

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

// Update category by id: PUT /api/category/update-category-by-id
export const updateCategory = async(req,res) => {
    try {
        const { id, name, image } = req.body

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
            image
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

// Delete category by id: DELETE /api/category/delete-category-by-id
export const deleteCategory = async(req,res) => {
    try {
        const { id } = req.body

        // Check category id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Invalid category id'
            })
        }

        // Delete category by id
        const deleteCategory = await CategoryModel.findByIdAndDelete(id)

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