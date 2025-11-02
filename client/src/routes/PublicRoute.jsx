import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const PublicRoute = () => {
    const user = useSelector(state => state?.user_data)
    const token = localStorage.getItem('token')

    // If user is logged in -> not allow to go to public page
    if(user?._id && token) {
        if (user.role === 'admin') {
            return <Navigate to='/admin' replace />
        }
        return <Navigate to='/' replace />
    }

    // If user is not logged in -> show public page
    return <Outlet />
}
