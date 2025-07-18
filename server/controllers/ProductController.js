import mongoose from 'mongoose'
import ProductModel from '../models/ProductModel.js'
import CategoryModel from '../models/CategoryModel.js'

// Create product: POST - /api/product/create-product
export const createProduct = async(req,res) => {
    try {
        const { name, image, description, price, discount, stock, categoryId } = req.body

        if(!name || !image[0] || !description || !price || !discount || !stock || !categoryId) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'All fields are required'
            })
        }

        // Check if product name exists
        const productExists = await ProductModel.findOne({ name })
        if(productExists) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Product already exists'
            })
        }

        const findCategoryId = await CategoryModel.findOne({ categoryId })
        if(!findCategoryId){
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Category not found'
            })
        }

        // Create new product
        const newProduct = await ProductModel.create({ 
            name, 
            image, 
            description, 
            price, 
            discount, 
            rating: 0, 
            stock, 
            category: findCategoryId._id,
            categoryId: findCategoryId.categoryId,
            stockHistory: []
        })

        // Send response
        res.status(200).json({
            success: true,
            error: false,
            message: 'Create product successfully',
            data: newProduct
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

// Get all products: GET - /api/product/all-products
export const getAllProducts = async(req,res) => {
    try {
        // Create a query to paginate the products, count the total number of products, and search for products
        let { page, limit, search } = req.body

        // Check if page and limit are provided
        if(!page) {
            page = 1
        }

        if(!limit) {
            limit = 10
        }

        // Check if search is provided
        // Finding nearly products based on product name
        const query = search ? {
            name: {
                $regex: search,
                $option: 'i'
            }
        } : {}

        // Calculate the skip page
        const skipPage = (page - 1) * limit

        // Get all products
        const [data, totalPageCount] = await Promise.all([
            ProductModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skipPage)
                .limit(limit),
            ProductModel.countDocuments(query)
        ])

        // Send response
        res.status(200).json({
            success: true,
            error: false,
            message: 'Get all products successfully',
            data: data,
            totalProductCount: totalPageCount,
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

// Get product by id: GET - /api/product/get-product/:id
export const getProductById = async(req,res) => {
    try {
        const { id } = req.params

        // Check product id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Invalid product id'
            })
        }

        // Get product by id
        const getProductById = await ProductModel.findById(id)

        // Send response
        res.status(200).json({
            success: true,
            error: false,
            message: 'Get product by id successfully',
            data: getProductById
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: true, 
            message: error.message
        })
    }
}

// Get product by category: GET - /api/product/get-product-by-category/:id
export const getProductByCategory = async(req,res) => {
    try {
        const { id } = req.params

        // Check product id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Invalid category id'
            })
        }

        // Get product by category
        const getProductByCategory = await ProductModel.find({ category: id })

        // Check if no product found
        if(getProductByCategory.length === 0) {
            return res.status(404).json({
                success: false,
                error: true, 
                message: 'No product found for this category',
                data: []
            })
        }

        // Send response
        res.status(200).json({
            success: true,
            error: false,
            message: 'Products retrieved successfully by category',
            data: getProductByCategory
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: true, 
            message: error.message
        })
    }
}

// Update product by id: PUT - /api/product/update-product/:id
export const updateProduct = async(req,res) => {
    try {
        const { id } = req.params
        const { name, image, description, price, discount, stock, category } = req.body 

        // Check product id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Invalid product id'
            })
        }

        // Update product by id
        const updateProduct = await ProductModel.findByIdAndUpdate(id, {
            name,
            image,
            description,
            price,
            discount,
            stock,
            category
        })

        // Send response
        res.status(200).json({
            success: true,
            error: false,
            message: 'Update product successfully',
            data: updateProduct
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: true, 
            message: error.message
        })
    }
}

// Delete product by id: DELETE - /api/product/delete-product/:id
export const deleteProduct = async(req,res) => {
    try {
        const { id } = req.params

        // Check product id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Invalid product id'
            })
        }

        // Delete product by id
        const deleteProduct = await ProductModel.findByIdAndDelete(id)

        // Send response
        res.status(200).json({
            success: true,
            error: false,
            message: 'Delete product successfully',
            data: deleteProduct
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: true, 
            message: error.message
        })
    }
}