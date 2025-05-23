import express from 'express'
import { uploadNewImage } from '../controllers/UploadNewImage.js'
import authUser from '../middleware/AuthUser.js'
import upload from '../middleware/Multer.js'

const router = express.Router()

router.post('/upload-image', authUser, upload.single('image'), uploadNewImage)

export default router