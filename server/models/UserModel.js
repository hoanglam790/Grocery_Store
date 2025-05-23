import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide your password']
    },
    avatar: {
        type: String,
        default: ''
    },
    refreshToken: {
        type: String,
        default: ''
    },
    forgetPasswordOtp: {
        type: String,
        default: ''
    },
    forgetPasswordOtpExpire: {
        type: Date,
        default: null
    },
    lastLogin: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    } 
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User