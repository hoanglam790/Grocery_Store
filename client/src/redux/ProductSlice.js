import { createSlice } from '@reduxjs/toolkit'
import { categories } from '../assets/assets'

const initialProductState = {
    categories: [],
    products: []
}

export const productSlice = createSlice({
    name: 'product_data',
    initialState: initialProductState,
    reducers: {
        setAllCategories: (state, action) => {
            state.categories = action.payload
        },
        setAllProducts: (state, action) => {
            state.products = [...action.payload]
        }
    }
})

export const { setAllCategories, setAllProducts } = productSlice.actions

export default productSlice.reducer