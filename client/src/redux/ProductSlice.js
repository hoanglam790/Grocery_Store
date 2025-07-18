import { createSlice } from '@reduxjs/toolkit'

const initialProductState = {
    category: [],
    product: []
}

export const productSlice = createSlice({
    name: 'product_data',
    initialState: initialProductState,
    reducers: {
        setAllCategories: (state, action) => {
            state.category = action.payload
        },
        setAllProducts: (state, action) => {
            state.product = [...action.payload]
        }
    }
})

export const { setAllCategories, setAllProducts } = productSlice.actions

export default productSlice.reducer