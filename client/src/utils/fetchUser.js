import Axios from '../common/AxiosConfig'
import ConnectApi from '../common/ApiBackend'

const fetchUser = async() => {
    try {
        const responseData = await Axios({
            ...ConnectApi.getUser
        })
        return responseData.data.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default fetchUser