import express from 'express'
import { registerUser, loginUser, logoutUser, forgetPassword, verifyOtp, resetPassword, getUser } from '../controllers/UserController.js'
import authUser from '../middleware/AuthUser.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', authUser, logoutUser)
router.post('/forget-password', forgetPassword)
router.post('/verify-otp', verifyOtp)
router.post('/reset-password', resetPassword)
router.get('/get-user', authUser, getUser)

export default router