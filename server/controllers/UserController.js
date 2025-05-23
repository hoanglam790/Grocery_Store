import UserModel from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import SendEmail from '../config/SendEmail.js'
import GenerateToken from '../utils/GenerateToken.js'
import GenerateOtp from '../utils/GenerateOtp.js'
import ForgetPasswordTemp from '../utils/ForgetPasswordTemp.js'

// Register user: POST /api/user/register
export const registerUser = async(req,res) => {
    try {
        // Destructure the request body
        const { name, email, password } = req.body
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'All fields are required'
            })
        }

        // Check if user already exists
        const userExists = await UserModel.findOne({ email })
        if(userExists) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'User already exists' 
            })
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const user = await UserModel.create({ 
            name, 
            email, 
            password: hashedPassword 
        })

        const token = await GenerateToken(user._id)

        // Send success response
        res.status(201).json({
            success: true,
            error: false, 
            message: 'User registered successfully', 
            data: { user, token }}
        )
    } catch(error) {
        // Send error response
        res.status(500).json({
            success: false,
            error: true, 
            message: error.message 
        })
    }
}

// Login user: POST /api/user/login
export const loginUser = async(req,res) => {
    try {
        // Destructure the request body
        const { email, password } = req.body
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'All fields are required'
            })
        }

        // Check if user exists
        const user = await UserModel.findOne({ email })
        if(!user) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'User does not exist' 
            })
        }

        // Check if user is active or not
        if(user.status != 'active') {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'User is not active, please contact for admin to activate your account' 
            })
        }

        // Check if password is correct
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Incorrect password, please check your password and try again' 
            })
        }

        // Generate token
        const token = await GenerateToken(user._id)

        // Cookie configuration
        const cookieOptions = { // Cookie configuration
            httpOnly: true, // Cookie will only be sent over HTTP
            secure: process.env.NODE_ENV === 'production', // Cookie will only be sent over HTTPS
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Cookie will be sent to all domains
            maxAge: 24 * 60 * 60 * 1000 // Cookie will expire in 1 day
        }

        // Set cookie
        res.cookie('token', token, cookieOptions)

        // Update last login
        await UserModel.findOneAndUpdate(
            { _id: user._id }, 
            { lastLogin: Date.now()}
        )

        // Send success response
        res.status(200).json({
            success: true,
            error: false, 
            message: 'Log in successfully', 
            token: token
        })
    } catch(error) {
        // Send error response
        res.status(500).json({
            success: false,
            error: true, 
            message: error.message
        })
    }
}

// Logout user: GET /api/user/logout
export const logoutUser = async(req,res) => {
    try {
        const userId = req.user.id // Get user id from token

        // Cookie configuration
        const cookieOptions = {
            httpOnly: true, // Cookie will only be sent over HTTP
            secure: process.env.NODE_ENV === 'production', // Cookie will only be sent over HTTPS
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Cookie will be sent to all domains
        }

        // Clear cookie
        res.clearCookie('token', cookieOptions)

        // Remove refresh token
        const removeToken = await UserModel.findOneAndUpdate(
            { _id: userId }, 
            { refreshToken: ''}
        )

        // Check if user exists or not
        if(!removeToken) {
            return res.status(404).json({
                success: false,
                error: true, 
                message: 'Not user found' 
            })
        }

        // Send success response
        res.status(200).json({
            success: true,
            error: false, 
            message: 'Log out successfully' 
        })
    } catch(error) {
        // Send error response
        res.status(500).json({
            success: false,
            error: true, 
            message: error.message 
        })
    }
}

// Forgot password: POST /api/user/forgot-password
export const forgetPassword = async(req,res) => {
    try {
        // Destructure the request body
        const { email } = req.body
        if(!email) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Email is required' 
            })
        }

        // Check if user exists or not
        const user = await UserModel.findOne({ email })
        if(!user) {
            return res.status(404).json({
                success: false,
                error: true, 
                message: 'User does not exist' 
            })
        }

        // Generate token   
        const otpPassword = await GenerateOtp()
        const expiresIn = new Date(Date.now() + 30 * 60 * 1000) // Expires in 30 minutes

        // Update user
        await UserModel.findOneAndUpdate(
            { _id: user._id }, 
            { 
                forgetPasswordOtp: otpPassword, 
                forgetPasswordOtpExpire: new Date(expiresIn).toISOString() 
            }
        )

        // Send email to user
        await SendEmail({   
            to: email,
            subject: 'Forgot Password From Grocery Store By Hoang Lam',
            html: ForgetPasswordTemp({
                name: user.name,
                otp: otpPassword
            })
        })

        // Send success response
        res.status(200).json({
            success: true,
            error: false, 
            message: 'OTP sent successfully to your email. Please check your email !!!' 
        })
    } catch(error) {
        // Send error response
        res.status(500).json({
            success: false,
            error: true, 
            message: error.message 
        })
    }
}

// Verify OTP: POST /api/user/verify-otp
export const verifyOtp = async(req,res) => {
    try {
        // Destructure the request body
        const { email, otp } = req.body
        if(!email || !otp) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'All fields are required' 
            })
        }

        // Check if user exists or not
        const user = await UserModel.findOne({ email })
        if(!user) {
            return res.status(404).json({
                success: false,
                error: true, 
                message: 'User does not exist' 
            })
        }

        // Check if OTP is valid or not
        if(user.forgetPasswordOtp !== otp) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'Invalid OTP. Please try again' 
            })
        }

        // Check if OTP is expired or not
        const expireTime = new Date(user.forgetPasswordOtpExpire).toISOString()
        const currentTime = new Date().toISOString()
        if(expireTime < currentTime) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'This OTP is expired. Please try again' 
            })
        }

        // Update user
        await UserModel.findOneAndUpdate(
            { _id: user._id }, 
            { 
                forgetPasswordOtp: '', 
                forgetPasswordOtpExpire: ''
            }
        )

        // Send success response
        res.status(200).json({
            success: true,
            error: false, 
            message: 'This OTP is valid. You can reset your password now'
        })
    } catch(error) {
        // Send error response
        res.status(500).json({
            success: false,
            error: true, 
            message: error.message 
        })
    }
}

// Reset password: POST /api/user/reset-password
export const resetPassword = async(req,res) => {
    try {
        // Destructure the request body
        const { email, newPassword, confirmPassword } = req.body
        if(!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'All fields are required' 
            })
        }

        // Check if user exists or not
        const user = await UserModel.findOne({ email })
        if(!user) {
            return res.status(404).json({
                success: false,
                error: true, 
                message: 'User does not exist' 
            })
        }

        // Check if new password and confirm password are same or not
        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                error: true, 
                message: 'New password and confirm password are not same' 
            })
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        // Update user
        await UserModel.findOneAndUpdate(
            { _id: user._id }, 
            { 
                password: hashedPassword, 
                forgetPasswordOtp: '', 
                forgetPasswordOtpExpire: ''
            }
        )

        // Send success response
        res.status(200).json({
            success: true,
            error: false, 
            message: 'Your password has been reset successfully' 
        })
    } catch(error) {
        // Send error response
        res.status(500).json({
            success: false,
            error: true, 
            message: error.message 
        })
    }
}

// Get user: GET /api/user/get-user
export const getUser = async(req,res) => {
    try {
        // Get user id from token
        const userId = req.user.id

        // Check if user exists or not
        const getUser = await UserModel.findById(userId)
        if(!getUser) {
            return res.status(404).json({
                success: false,
                error: true, 
                message: 'User does not exist' 
            })
        }

        // Send success response
        res.status(200).json({
            success: true,
            error: false, 
            message: 'User fetched successfully',
            data: getUser
        })
    } catch(error) {
        // Send error response
        res.status(500).json({
            success: false,
            error: true, 
            message: error.message 
        })  
    }
}