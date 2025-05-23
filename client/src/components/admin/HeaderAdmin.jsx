import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useAdminContext } from '../../context/AdminContext'

const HeaderAdmin = () => {
    const { user } = useAdminContext()
    return (
        <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300'>
            <Link to='/'>
                <img className='h-20 w-36 mix-blend-multiply' src={assets.grocery_store} alt='grocery_store' />
            </Link>
            <div className='flex items-center gap-5 text-gray-500'>
                <p>Hi! {user.name}</p>
                <button className='border rounded-full text-sm px-4 py-1'>Logout</button>
            </div>
        </div>
    )
}

export default HeaderAdmin
