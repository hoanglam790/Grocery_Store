import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = ({ role, blockAdmin = false }) => {
    const user = useSelector(state => state?.user_data)
    const token = localStorage.getItem('token')

    // Check if user does not log in -> redirect to login or home page
    if(!user?._id || !token) {
        return <Navigate to='/login' replace />
    }

    // Check if user role is admin -> redirect to admin
    if (blockAdmin && user.role === 'admin') {
        return null
    }

    // Check if user role does not match -> redirect to correct page
    if(role && user?.role !== role) {
        if(user?.role === 'admin'){
            return <Navigate to='/admin' replace />
        }
        return <Navigate to='/' replace />
    }

    // If all checks pass -> show content
    return <Outlet />
}
