import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/user/Home'
import Login from '../pages/user/Login'
import ForgetPassword from '../pages/user/ForgetPassword'
import AllProducts from '../pages/user/AllProducts'
import Register from '../pages/user/Register'
import VerifyOTP from '../pages/user/VerifyOTP'
import ResetPassword from '../pages/user/ResetPassword'
import Dashboard from '../pages/admin/Dashboard'
import CategoryAdmin from '../pages/admin/CategoryAdmin'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },           
            {
                path: '/products',
                element: <AllProducts />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/forget-password',
                element: <ForgetPassword />
            },
            {
                path: '/verify-otp',
                element: <VerifyOTP />
            },
            {
                path: '/reset-password',
                element: <ResetPassword />
            }           
        ],
    },
    {
        path: 'admin',
        element: <Dashboard />,
        children: [
            {
                path: 'categories',
                element: <CategoryAdmin />
            }
        ]
    }
])

export default router