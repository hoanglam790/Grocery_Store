import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'
import { toast } from 'react-hot-toast'
import { CgSpinner } from 'react-icons/cg'

const ForgetPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({
        email: ''
    })

    const navigate = useNavigate()

    // Handle change button color when the input field is not empty
    const changeValueEvent = Object.values(userData).every((e) => e !== '')

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

    // Handle key down
    const handleSubmitKeyDown = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    // Handle submit
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...ConnectApi.forgetPassword,
                data: userData
            })
            if(responseData.data.success) {
                toast.success(responseData.data.message)

                // Redirect to verify otp
                navigate('/verify-otp', {
                    state: userData
                })

                // Reset user data
                setUserData({
                    email: ''
                })
            }
            else {
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
            <form onSubmit={handleSubmit} onKeyDown={handleSubmitKeyDown} className='flex flex-col gap-4 m-auto p-8 py-12 w-full sm:w-[352px] md:w-[402px] rounded-lg shadow-xl border border-gray-200 bg-gray-50'>
                <h2 className='text-2xl font-semibold mb-6 text-center text-gray-800'>Forget Password ?</h2>
                <label htmlFor='email'>Email: </label>
                <input 
                    id='email' type='email'
                    name='email'
                    value={userData.email} 
                    onChange={handleChange} 
                    className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4'
                    placeholder='Enter your email'
                />

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
                            Send Email
                        </button>
                    )
                }
                
                <p onClick={() => navigate('/register')} className='text-center mt-4'>Don't have an account ? <span className='text-indigo-700 underline cursor-pointer'>Sign Up Now</span></p>
            </form>
        </div>    
    )
}

export default ForgetPassword
