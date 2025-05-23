import Axios from '../common/AxiosConfig'
import ConnectApi from '../common/ApiBackend'

const fetchUser = async() => {
    try {
        const responseData = await Axios({
            ...ConnectApi.getUser
        })
        return responseData.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUser