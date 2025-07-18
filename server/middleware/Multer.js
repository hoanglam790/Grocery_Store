import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Image size limit: 10MB
    }
})

export default upload