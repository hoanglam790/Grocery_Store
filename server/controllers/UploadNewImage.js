import Axios from 'axios'
import uploadImageCloudinary from '../utils/UploadImageByCloudinary.js'

export const uploadNewImage = async(req,res) => {
    try {
        const file = req.file
        console.log('file', file)
        const uploadImg = await uploadImageCloudinary(file)
        
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Image uploaded successfully',
            data: uploadImg 
        })
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const checkImage = async(req,res) => {
    try {
        const { public_id } = req.body
        const checkImage = await Axios.get(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload/${public_id}`)
        
        if(checkImage.data.resources && checkImage.data.resources.length > 0) {
            return res.status(400).json({
                success: true,
                error: false,
                message: 'Image has already been uploaded',
                data: checkImage.data.resources[0]
            })
        }
        else{
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Public_id not found'               
            })
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            error: true,
            message: error.message 
        })
    }
}