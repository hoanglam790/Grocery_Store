import React, { useState } from 'react'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { IoMailOpenOutline } from 'react-icons/io5'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { CgSpinner } from 'react-icons/cg'

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
    const handleRegisterKeyDown = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault()
            handleSubmitRegister(e)
        }
    }

    // Handle submit
    const handleSubmitRegister = async(e) => {
        e.preventDefault()

        // Check if password and confirm password are the same
        if(userData.password !== userData.confirmPassword) {
            // Send error response
            toast.error('Password and confirm password are not the same')
            return
        }

        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...ConnectApi.register,
                data: userData
            })

            // Check if register is successful
            if(responseData.data.success) {
                // Send success response
                toast.success(responseData.data.message)

                // Reset user data
                setUserData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })

                // Change state to login
                navigate('/login')
            }
            else if(responseData.data.error) {
                // Send error response
                toast.error(responseData.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='flex items-center text-gray-600 mt-44'>
            <form onSubmit={handleSubmitRegister} onKeyDown={handleRegisterKeyDown} className='flex flex-col gap-4 m-auto p-8 py-12 w-full sm:w-[352px] md:w-[402px] rounded-lg shadow-xl border border-gray-200 bg-gray-50'>
                <div className='flex items-center'>
                    <button onClick={handleNavigateHome} className='cursor-pointer'>
                        <HiArrowNarrowLeft size={25} />
                    </button>
                    <p className='text-3xl font-medium m-auto'>
                        <span className='text-indigo-500 font-bold'></span>Sign Up
                    </p>
                </div>

                <div className='flex items-center w-full mt-3 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
                    <MdDriveFileRenameOutline size={20} />
                    <input onChange={handleChange} name='name' value={userData.name} type='text' placeholder='Enter your name' className='bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full'/>
                </div>

                <div className='flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
                    <IoMailOpenOutline size={20} />
                    <input onChange={handleChange} name='email' value={userData.email} type='email' placeholder='Enter your email' className='bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full'/>
                </div>
                
                <div className='flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
                    <RiLockPasswordLine size={20} />
                    <input onChange={handleChange} name='password' value={userData.password} type='password' placeholder='Enter your password' className='bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full'/>
                </div>

                <div className='flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
                    <RiLockPasswordLine size={20} />
                    <input onChange={handleChange} name='confirmPassword' value={userData.confirmPassword} type='password' placeholder='Enter your password again to confirm' className='bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full'/>
                </div>

                <p>
                    Already have account ? <span onClick={() => navigate('/login')} className='text-indigo-500 cursor-pointer italic'>Login now</span>
                </p>

                {
                    isLoading ? (
                        <div className='flex items-center justify-center'>
                            <CgSpinner size={30} className='animate-[spin_0.8s_linear_infinite]'/>
                        </div>
                    ) : (
                        <button disabled={!changeValueEvent} 
                            className={`${changeValueEvent ? 'bg-green-500 hover:bg-green-600 transition-all text-white w-full py-2 rounded-md cursor-pointer' 
                            : 'bg-gray-400 transition-all text-white w-full py-2 rounded-md cursor-not-allowed'}`}>
                            Create Account
                        </button>
                    )
                }            
            </form>
        </div>
    )
}

export default Register
