import grocery_store from './grocery_store_logo.png'
import grocery_store_icon from './grocery_store_icon.png'
import banner_1 from './banner_1.png'
import banner_2 from './banner_2.png'
import banner_3 from './banner_3.png'
import no_data from './no-data.png'

export const assets = {
    grocery_store,
    grocery_store_icon,
    banner_1,
    banner_2,
    banner_3,
    no_data
}

export const categories = [
    {
        text: 'Grocery Store',
        path: 'grocery-store',
        image: grocery_store_icon
    }
]

export const products = [
    {
        name: 'Casual Shoes',
        category: 'Sports',
        price: 100,
        offerPrice: 80,
        rating: 4,
        image: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png',
        stock: 10
    }
]