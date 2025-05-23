import mongoose from 'mongoose'
import 'dotenv/config'

const connectDatabase = async() => {
    try {
        const mongo_uri = process.env.MONGO_URI
        // Check if MongoDB URI is defined or not
        if(!mongo_uri) {
            throw new Error('MongoDB URI is not defined in env file')
        }

        // Connect to MongoDB
        const conn = await mongoose.connect(mongo_uri)
        // Log connection status
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(error) {
        console.log(error)
        process.exit(1) // Exit process with failure
    }
}

export default connectDatabase // Export the function