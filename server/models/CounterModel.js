import mongoose from 'mongoose'

const counterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        default: 0
    }
})

const counter = mongoose.model('Counter', counterSchema)

export default counter