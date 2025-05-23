import Axios from '../common/AxiosConfig'
import ConnectApi from '../common/ApiBackend'

const uploadNewImage = async(image) => {
    try {
        const formData = new FormData()
        formData.append('image', image)

        const response = await Axios({
            ...ConnectApi.uploadImage,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    } catch (error) {
        throw error
    }
}

export default uploadNewImage