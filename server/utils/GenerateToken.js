import jwt from 'jsonwebtoken'
import 'dotenv/config'

const generateToken = async(userId) => { 
    const token = await jwt.sign({ id: userId }, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '1d' } // Expires in 1 day
    ) 
    return token
}

export default generateToken