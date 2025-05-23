import { createContext, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../redux/userSlice'
import fetchUser from '../utils/fetchUser'

// Create context
export const AdminContext = createContext() 

// Create context provider
export const AdminContextProvider = ({ children }) => { 
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Get user details from local storage (Redux)
    const user = useSelector((state) => state?.user_data)

    const fetchUserDetails = async() => {
        const responseData = await fetchUser()
        dispatch(setUserDetails(responseData.data))
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    const value = { navigate, dispatch, user, fetchUserDetails }

    return <AdminContext.Provider value={value}>
        {children}
    </AdminContext.Provider>
}

// Custom hook to use the context
export const useAdminContext = () => {
    return useContext(AdminContext)
}
