import CounterNumberId from '../models/CounterModel.js'

export const generateCategoryId = async() => {
    const counter = await CounterNumberId.findOneAndUpdate(
        { name: 'category'}, // Counter name
        { $inc: { value: 1 } }, // Start from 1 and increment by 1
        { new: true, upsert: true }
    ) // If no counter found, create new one
    return counter.value
}

export const generateProductId = async() => {
    const counter = await CounterNumberId.findOneAndUpdate(
        { name: 'product'}, // Counter name
        { $inc: { value: 1 } }, // Start from 1 and increment by 1
        { new: true, upsert: true }
    ) // If no counter found, create new one
    return counter.value
}