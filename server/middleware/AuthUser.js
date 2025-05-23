import jwt from 'jsonwebtoken'

const authUser = async(req, res, next) => {
    const token = req?.body?.token || req?.cookies?.token
    if(!token) {
        return res.status(401).json({ 
            success: false,
            error: true,
            message: 'No token provided'
        })
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next() // Go to next middleware
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: true,
            message: 'Unauthorized' 
        })
    }
}

export default authUser