import React from 'react'
import { NavLink } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import { MdAccountBox, MdOutlineCategory } from 'react-icons/md'
import { AiOutlineProduct } from 'react-icons/ai'
import { IoNewspaperOutline } from 'react-icons/io5'
import { TiShoppingCart } from 'react-icons/ti'
import { FaWarehouse } from 'react-icons/fa'
import { IoIosStats } from 'react-icons/io'

const SidebarAdmin = () => {
    const dashboardicon = (
        <RxDashboard size={25}/>
    )

    const accounticon = (
        <MdAccountBox size={25} />
    )

    const categoryicon = (
        <MdOutlineCategory size={25} />
    )

    const producticon = (
        <AiOutlineProduct size={25} />
    )

    const newsicon = (
        <IoNewspaperOutline size={25} />
    )

    const ordericon = (
        <TiShoppingCart size={25} />
    )

    const warehouseicon = (
        <FaWarehouse size={25} />
    )

    const statsicon = (
        <IoIosStats size={25}/>
    )
    const sidebarLinks = [
        { name: 'Dashboard', path: '/admin', icon: dashboardicon },
        { name: 'Account Information', path: '/admin/account', icon: accounticon },
        { name: 'Category', path: '/admin/categories', icon: categoryicon },
        { name: 'Product', path: '/admin/products', icon: producticon},
        { name: 'News', path: '/admin/news', icon: newsicon},
        { name: 'Order', path: '/admin/orders', icon: ordericon},
        { name: 'Warehouse', path: '/admin/warehouse', icon: warehouseicon},
        { name: 'Statistics', path: '/admin/statistics', icon: statsicon}
    ]

    return (
        <div className='md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300'>
            {sidebarLinks.map((item) => (
                <NavLink to={item.path} key={item.name} end={item.path === '/admin'}
                    className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                        ${isActive ? 'border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500'
                            : 'hover:bg-gray-100/90 border-white text-gray-700'
                        }`
                    }
                >
                    {item.icon}
                    <p className='md:block hidden text-center'>{item.name}</p>
                </NavLink>
            ))}                          
        </div>
    )
}

export default SidebarAdmin
