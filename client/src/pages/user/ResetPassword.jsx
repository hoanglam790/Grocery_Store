import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'
import { toast } from 'react-hot-toast'
import { CgSpinner } from 'react-icons/cg'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const ResetPassword = () => {
    const [userData, setUserData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    })
    const navigate = useNavigate()
    const currentLocation = useLocation()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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

    // Handle change button color when the input field is not empty
    const changeValueEvent = Object.values(userData).every((e) => e !== '')

    // Handle submit
    const handleSubmit = async(e) => {
        e.preventDefault()
        // Check if password and confirm password are the same or not
        if(userData.newPassword !== userData.confirmPassword){
            toast.error('Password and confirm password are not the same')
            return
        }

        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...ConnectApi.resetPassword,
                data: userData
            })

            // Check if reset password is successful
            if(responseData.data.success){
                toast.success(responseData.data.message)
                navigate('/login')
                setUserData({
                    email: '',
                    newPassword: '',
                    confirmPassword: ''
                })
            }
            else {
                toast.error(responseData.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // Check if email is available
        if(currentLocation?.state?.email) {
            setUserData((prev) => {
                return {
                    ...prev,
                    email: currentLocation?.state?.email
                }
            })
        }
        // Check if the current location state is available or not
        else if(!currentLocation?.state?.data?.success) {
            navigate('/')
        }
    }, [])

    return (
        <div className='flex items-center text-gray-600 mt-44'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 m-auto p-8 py-12 w-full sm:w-[352px] md:w-[402px] rounded-lg shadow-xl border border-gray-200 bg-gray-50'>
                <h2 className='text-2xl font-semibold mb-6 text-center text-gray-800'>Create New Password</h2>
                <div className='space-y-6'>
                    <div className='mt-3'>
                        <label htmlFor='email'>New password: </label>
                        <div className='flex items-center relative'>
                            <input 
                                id='password' type={showPassword ? 'text' : 'password'}
                                name='newPassword'
                                value={userData.newPassword} 
                                onChange={handleChange} 
                                className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4'
                                placeholder='Enter your new password'
                            />
                            <div onClick={() => setShowPassword((prev) => !prev)} className='text-xl absolute right-3 cursor-pointer opacity-50'>
                                <span>
                                    {showPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </span>                                   
                            </div>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor='email'>Confirm password: </label>
                        <div className='flex items-center relative'>
                            <input 
                                id='confirmPassword' type={showConfirmPassword ? 'text' : 'password'}
                                name='confirmPassword'
                                value={userData.confirmPassword} 
                                onChange={handleChange} 
                                className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4'
                                placeholder='Enter your confirm password'
                            />
                            <div onClick={() => setShowConfirmPassword((prev) => !prev)} className='text-xl absolute right-3 cursor-pointer opacity-50'>
                                <span>
                                    {showConfirmPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </span>                                   
                            </div>
                        </div>
                    </div>
                </div>
                
                {
                    isLoading ? (
                        <div className='flex items-center justify-center'>
                            <CgSpinner size={30} className='animate-[spin_0.8s_linear_infinite]'/>
                        </div>
                    ) : (
                        <button
                            disabled={!changeValueEvent} 
                            className={`${changeValueEvent ? 'w-full my-3 bg-blue-800 active:scale-95 transition py-2.5 rounded text-white cursor-pointer'
                                :
                                'w-full my-3 bg-gray-800 transition py-2.5 rounded text-white cursor-not-allowed'}`}>
                            Agree
                        </button>
                    )
                }
            </form>
        </div>
    )
}

export default ResetPassword
