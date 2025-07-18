import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserSlice'
import ProductReducer from './ProductSlice'

export const store = configureStore({
    reducer: {
        user_data: UserReducer,
        product_data: ProductReducer
    },
})

