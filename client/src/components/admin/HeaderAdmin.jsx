import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useAdminContext } from '../../context/AdminContext'
import Swal from 'sweetalert2'
import { showAlert, showErrorAlert } from '../../utils/AlertUtils'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'

const HeaderAdmin = () => {
    const { user, dispatch, navigate } = useAdminContext()

    const handleLogout = async(e) => {
        e.preventDefault()
        const result = await Swal.fire({
            position: 'center',
            icon: 'question',
            title: 'Are you sure you want to logout?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        })

        if(result.isConfirmed) {
            try {
                const responseData = await Axios({
                    ...ConnectApi.logout
                })

                await showAlert(responseData, {
                    onSuccess: () => {
                        dispatch(setLogout(null))
                        localStorage.removeItem('token')
                        navigate('/')
                    },
                    onFail: () => {
                        console.warn('Logout failed.')
                    }
                })
            } catch (error) {
                await showErrorAlert(error)
            }
        }
    }
    return (
        <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300'>
            <Link to='/'>
                <img className='h-20 w-36 mix-blend-multiply' src={assets.grocery_store} alt='grocery_store' />
            </Link>
            <div className='flex items-center gap-5 text-gray-500'>
                <p>Hi! {user.name}</p>
                <button 
                    onClick={handleLogout} 
                    className='border rounded-full text-sm px-4 py-1 cursor-pointer'>Logout</button>
            </div>
        </div>
    )
}

export default HeaderAdmin
