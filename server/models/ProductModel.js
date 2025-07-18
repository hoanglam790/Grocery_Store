import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        unique: true
    },
    image: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        max: 100,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    },
    stockHistory: [
        {
            quantityAdded: {
                type: Number,
                default: null
            },
            costPrice: {
                type: Number,
                default: null
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    isDisplayed: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product