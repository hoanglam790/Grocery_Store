import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'
import { toast } from 'react-hot-toast'
import { CgSpinner } from 'react-icons/cg'

const VerifyOTP = () => {
    const [otp, setOtp] = useState(['','','','','',''])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const currentLocation = useLocation()
    const inputNumber = useRef([])

    // Handle input
    const handleInput = (e, index) => {
        const value = e.target.value
        const newData = [...otp]
        newData[index] = value
        setOtp(newData)
        if(value && index < inputNumber.current.length - 1){
            inputNumber.current[index + 1].focus()
        }
    }

    // Handle change button color when the input field is not empty
    const changeValueEvent = Object.values(otp).every((e) => e !== '')

    // Handle key down
    const handleKeyDown = (e, index) => {
        const value = e.target.value
        const newData = [...otp]
        newData[index] = value
        setOtp(newData)
        if(e.key === 'Backspace' && value === '' && index > 0){
            inputNumber.current[index - 1].focus()
        }
    }

    // Handle copy and paste
    const handleCopyAndPaste = (e) => {
        e.preventDefault() // Prevent default
        const pasteValue = e.clipboardData.getData('text') // Get paste value
        const numbers = pasteValue.split('').slice(0, otp.length)
        const newData = [...otp]

        // Set new data
        numbers.forEach((number, index) => {
            newData[index] = number
        })
        setOtp(newData)
    }

    // Handle submit
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...ConnectApi.verifyOtp,
                data: {
                    email: currentLocation?.state?.email,
                    otp: otp.join('')
                }
            })

            // Check if login is successful
            if(responseData.data.success) {
                // Send success response
                toast.success(responseData.data.message)

                // Reset user data
                setOtp(['','','','','',''])

                // Navigate to reset password
                navigate('/reset-password', {
                    state: {
                        data: responseData.data,
                        email: currentLocation?.state?.email
                    }   
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

    // Handle reset
    const handleResetData = () => {
        setOtp(['', '', '', '', '', ''])  // Reset otp
    }

    // Handle use effect
    // If this current email is not the same as the email in the state => navigate to forget password
    useEffect(() => {
        // Check if current email is the same as the email in the state
        if(!currentLocation?.state?.email){
            navigate('/forget-password')
        }
    },[])

    return (
        <div className='flex items-center text-gray-600 mt-44'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 m-auto p-8 py-12 w-full sm:w-[352px] md:w-[402px] rounded-lg shadow-xl border border-gray-200 bg-gray-50'>
                <p className='text-2xl font-semibold mb-6 text-center text-gray-800'>Email Verify OTP</p>
                <h2 className='mt-2 text-sm text-gray-900/90 text-center'>Enter the 6-digit code sent to your email ID.</h2>

                <div className='flex items-center justify-between mb-6 gap-3'>
                    {
                        otp.map((_, index) => {
                            return (
                                <input 
                                    key={'otp' + index} 
                                    type='text' required
                                    name='otp' 
                                    maxLength={1}
                                    value={otp[index]}
                                    ref={(ref) => {
                                        inputNumber.current[index] = ref
                                        return ref
                                    }}                              
                                    onChange={(e) => handleInput(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onPaste={handleCopyAndPaste}                                   
                                    className='text-gray-800 bg-white border border-gray-300 w-full text-sm text-center px-4 py-2.5 rounded-md outline-blue-500'
                                />
                            )}
                        )  
                    }
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
                            Verify
                        </button>
                    )
                }

                <button type='button' onClick={handleResetData} 
                    className='w-full bg-gray-800 transition py-2.5 rounded text-white cursor-pointer'>
                    Reset Data
                </button>
            </form>
        </div>
    )
}

export default VerifyOTP
