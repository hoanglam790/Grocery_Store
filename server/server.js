import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import ConnectDatabase from './config/Database.js'
import UserRoute from './routes/UserRoute.js'
import CategoryRoute from './routes/CategoryRoute.js'
import UploadImageRoute from './routes/UploadImageRoute.js'
import ProductRoute from './routes/ProductRoute.js'

const app = express()
const PORT = process.env.PORT || 5000

// Allow multiple origins
const corsOptions = {
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
}

// Middleware configuration
app.use(express.json()) // For parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()) // For parsing cookies
app.use(cors(corsOptions))
app.use(session({
    secret: process.env.SESSION_SECRET_KEY, // Secret key
    resave: true, // Save session even if unmodified
    saveUninitialized: true, // Save session even if empty
    // Cookie configuration
    cookie: {
        path: '/', // Cookie will be sent to all routes
        httpOnly: true, // Cookie will only be sent over HTTP
        secure: true, // Cookie will only be sent over HTTPS
        sameSite: 'none', // Cookie will be sent to all domains
        maxAge: 24 * 60 * 60 * 1000 // Keep cookie for 1 day
    }
}))

// API endpoints
app.use('/api/user', UserRoute)
app.use('/api/category', CategoryRoute)
app.use('/api/file', UploadImageRoute)
app.use('/api/product', ProductRoute)

// Test api
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is running on port: ' + PORT
    })
})

// Start server
app.listen(PORT, () => {
    ConnectDatabase()
    console.log(`Server is running on http://localhost:${PORT}`)
})