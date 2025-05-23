import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide category name']
    },
    image: {
        type: String,
        required: [true, 'Please provide category image']
    },
    isDisplayed: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

export default Category
