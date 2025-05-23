import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMailOpenOutline } from 'react-icons/io5'
import { RiLockPasswordLine } from 'react-icons/ri'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'
import { toast } from 'react-hot-toast'
import fetchUser from '../../utils/fetchUser'
import { setUserDetails } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
import { CgSpinner } from 'react-icons/cg'

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate() // Navigate
    const dispatch = useDispatch() // Dispatch

    // Handle change
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Handle back to home
    const handleNavigateHome = () => {
        toast.dismiss() // Dismiss toast
        navigate('/')
    }

    // Handle change button color when the input field is not empty
    const changeValueEvent = Object.values(userData).every((e) => e !== '')

    // Handle key down
    const handleLoginKeyDown = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault()
            handleSubmitLogin(e)
        }      
    }

    // Handle submit
    const handleSubmitLogin = async(e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...ConnectApi.login,
                data: userData
            })

            // Check if login is successful
            if(responseData.data.success) {
                // Send success response
                toast.success(responseData.data.message)

                // Save token to local storage
                localStorage.setItem('token', responseData.data.token)

                // Update user details
                const updateUser = await fetchUser()
                dispatch(setUserDetails(updateUser.data))

                // Reset user data
                setUserData({
                    email: '',
                    password: ''
                })

                // Check user role and redirect
                if(updateUser.data.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
            }
            if(responseData.data.error) {
                // Send error response
                toast.error(responseData.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex items-center text-gray-600 mt-40'>
            <form onSubmit={handleSubmitLogin} onKeyDown={handleLoginKeyDown} className='flex flex-col gap-4 m-auto p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-gray-50'>
                <div className='flex items-center'>
                    <button onClick={handleNavigateHome} className='cursor-pointer'>
                        <HiArrowNarrowLeft size={25} />
                    </button>
                    <p className='text-3xl font-medium m-auto'>
                        <span className='text-indigo-500 font-bold'></span>Login
                    </p>
                </div>
                
                <div className='flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
                    <IoMailOpenOutline size={20} />
                    <input onChange={handleChange} name='email' value={userData.email} type='email' placeholder='Enter your email' className='bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full'/>
                </div>
                
                <div className='flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
                    <RiLockPasswordLine size={20} />
                    <input onChange={handleChange} name='password' value={userData.password} type='password' placeholder='Enter your password' className='bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full'/>
                </div>

                <div className='text-right py-2'>
                    <Link to='/forget-password' className='text-blue-600 underline italic'>Forget Password ?</Link>
                </div>
                
                {
                    isLoading ? (
                        <div className='flex items-center justify-center'>
                            <CgSpinner size={30} className='animate-[spin_0.8s_linear_infinite]'/>
                        </div>
                    ) : (
                        <button disabled={!changeValueEvent} 
                            className={`${changeValueEvent ? 'bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer' 
                            : 
                            'bg-gray-400 transition-all text-white w-full py-2 rounded-md cursor-not-allowed'}`}>
                            Login
                        </button>
                    )
                }
                
                <p>
                    Don't have an account ? <span onClick={() => navigate('/register')} className='text-indigo-500 cursor-pointer italic'>
                        Sign up now
                    </span>
                </p>

                <div className='my-2 flex items-center gap-4'>
                    <hr className='w-full border-gray-300' />
                    <p className='text-sm text-gray-800 text-center'>Or</p>
                    <hr className='w-full border-gray-300' />
                </div>

                <button type='button' className='w-full flex items-center gap-2 justify-center bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800'>
                    <img 
                        src='https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png'
                        className='h-4 w-4'
                        alt='googleFavicon'
                    />
                    Login with Google
                </button>               
            </form>
        </div>       
    )
}

export default Login
