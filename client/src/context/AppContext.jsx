import { createContext, useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { products } from '../assets/assets'
import { setUserDetails } from '../redux/UserSlice'
import fetchUser from '../utils/FetchUser'

// Create context
export const AppContext = createContext() 

// Create context provider
export const AppContextProvider = ({ children }) => { 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const [user, setUser] = useState(null)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [product, setProduct] = useState([])
    const [searchQuery, setSearchQuery] = useState({})

    // Get user details from local storage (Redux)
    const user = useSelector(state => state?.user_data)

    const fetchUserDetails = async() => {
        try {
            const responseData = await fetchUser()
            console.log("📦 responseData:", responseData)
            if(responseData.data) {
                dispatch(setUserDetails(responseData.data))
            } else {
                console.warn("No user data received.")
            }
        } catch (error) {
            console.error("Failed to fetch user", error)
        }
    }

    const fetchProducts = async() => { 
        setProduct(products)
    }
    
    useEffect(() => {
        fetchUserDetails()
        fetchProducts()
    }, [])

    const value = { navigate, dispatch, user, setShowUserLogin, product, setProduct, fetchUserDetails, fetchProducts }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

// Custom hook to use the context
export const useAppContext = () => {
    return useContext(AppContext)
}
