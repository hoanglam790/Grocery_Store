
export const baseUrl = import.meta.env.VITE_BASE_URL

const connectApi = {
    // API: User
    register: {
        url: '/api/user/register',
        method: 'POST' 
    },
    login: {
        url: '/api/user/login',
        method: 'POST'
    },
    logout: {
        url: '/api/user/logout',
        method: 'GET'
    },
    forgetPassword: {
        url: '/api/user/forget-password',
        method: 'POST'
    },
    verifyOtp: {
        url: '/api/user/verify-otp',
        method: 'POST'
    },
    resetPassword: {
        url: '/api/user/reset-password',
        method: 'POST'
    },
    getUser: {
        url: '/api/user/get-user',
        method: 'GET'
    },

    // API: Category
    getAllCategories: {
        url: '/api/category/all-categories',
        method: 'POST'
    },
    getCategoryById: {
        url: '/api/category/get-category',
        method: 'GET'
    },
    createCategory: {
        url: '/api/category/create',
        method: 'POST'
    },
    updateCategory: {
        url: '/api/category/update-category',
        method: 'PUT'
    },
    deleteCategory: {
        url: '/api/category/delete-category',
        method: 'DELETE'
    },

    // API: Upload image
    uploadImage: {
        url: '/api/file/upload-image',
        method: 'POST'
    },
    checkImage: {
        url: '/api/file/check-image',
        method: 'POST'
    },

    // API: Product
    createProduct: {
        url: '/api/product/create-product',
        method: 'POST'
    },
    getAllProducts: {
        url: '/api/product/all-products',
        method: 'POST'
    },
    getProductById: {
        url: '/api/product/get-product',
        method: 'GET'
    },
    getProductByCategory: {
        url: '/api/product/get-product-by-category',
        method: 'GET'
    },
    updateProduct: {
        url: '/api/product/update-product',
        method: 'PUT'
    },
    deleteProduct: {
        url: '/api/product/delete-product',
        method: 'DELETE'
    },
}

export default connectApi