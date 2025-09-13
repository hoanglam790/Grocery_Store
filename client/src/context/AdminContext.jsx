import { createContext, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../redux/UserSlice'
import { setAllCategories } from '../redux/ProductSlice'
import fetchUser from '../utils/FetchUser'
import Axios from '../common/AxiosConfig'
import ConnectApi from '../common/ApiBackend'

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

    const fetchCategoryData = async() => {
        try {
            const responseData = await Axios({
                ...ConnectApi.getAllCategories
            })

            // Check if fetch categories is successful
            if(responseData?.data?.success) {
                dispatch(setAllCategories(responseData?.data?.data))
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserDetails()
        fetchCategoryData()
    }, [])

    const value = { navigate, dispatch, user, fetchUserDetails, fetchCategoryData }

    return <AdminContext.Provider value={value}>
        {children}
    </AdminContext.Provider>
}

// Custom hook to use the context
export const useAdminContext = () => {
    return useContext(AdminContext)
}
