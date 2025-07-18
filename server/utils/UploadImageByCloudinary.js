import { v2 as cloudinary } from 'cloudinary'
import '../config/Cloudinary.js'

const uploadImageCloudinary = async(image) => {
    if (!image || !image.buffer) {
        throw new Error('Image file or buffer is missing')
    }

    // Get image from file
    const fileName = image.originalname || 'default_name'
    const buffer = image.buffer

    // Use the file name as the unique identifier
    const uploadImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'Grocery_store',
                public_id: fileName.split('.')[0],
                resource_type: 'auto' // Auto-detect file type
            },
            (error, result) => {
                if(error) {
                    return reject(error)
                } else {
                    return resolve(result)
                }              
            }
        )
        stream.end(buffer)
    })
    return uploadImage
}

export default uploadImageCloudinary