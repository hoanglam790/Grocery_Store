import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GrSearch } from 'react-icons/gr'
import { TiShoppingCart } from 'react-icons/ti'
import { MdMenu } from 'react-icons/md'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'
import { setLogout } from '../../redux/userSlice'
import { toast } from 'react-hot-toast'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Dashboard from '../../pages/admin/Dashboard'

const Header = () => {
    const [open, setOpen] = useState(false)
    const { user, setShowUserLogin, navigate, dispatch } = useAppContext()
    
    // Handle logout
    const handleLogout = async() => {
        confirmAlert({
            title: 'Logout',
            message: 'Are you sure you want to logout ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async() => {
                        try {
                                const responseData = await Axios({
                                    ...ConnectApi.logout
                            })
                            // Check if login is successful
                            if(responseData.data.success) {
                                dispatch(setLogout(null))
                                localStorage.removeItem('token') // Remove token from local storage
                                // Send success response
                                toast.success(responseData.data.message, {
                                    duration: 3000,
                                    position: 'top-center'
                                })
                                navigate('/')
                            }
                            else {
                                toast.error(responseData.data.message)
                            }
                        } catch (error) {
                            toast.error(error.response.data.message)
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        })
    }

    // Create navigation
    const navigation = [
        {
            title: 'Home',
            href: ''
        },
        {
            title: 'Products',
            href: 'products'
        },
        {
            title: 'News',
            href: 'news'
        },
        {
            title: 'Contact',
            href: 'contact'
        }
    ]

    return (
        <nav className='h-28 border-b fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4  border-gray-300 bg-white transition-all'>
            {
                user?.role === 'Admin' ? (
                    <Dashboard />
                ) : (
                    <>
                        {/* Logo */}
                        <Link to='/'>
                            <img className='h-20 w-36 mix-blend-multiply' src={assets.grocery_store} alt='grocery_store' />
                        </Link>

                        {/* Desktop Menu */}
                        <div className='hidden sm:flex items-center gap-12'>
                            {
                                navigation.map((nav, index) => {
                                    return (
                                        <div>
                                            <NavLink key={nav.title} to={nav.href} 
                                                className={({ isActive })=>`px-2 font-bold hover:text-blue-800 ${isActive && 'text-blue-700 max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:block lg:after:bg-green-500 lg:after:w-full lg:after:h-[3px] lg:after:-bottom-4'}`}>
                                                {nav.title}
                                            </NavLink>
                                        </div>
                                    )
                                })
                            }

                            {/* Search bar */}
                            <div className='hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full'>
                                <input className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500' type='text' placeholder='Search products' />
                                <GrSearch className='fill-gray-600' size={18}/>
                            </div>

                            {/* Cart */}
                            <div className='relative cursor-pointer'>
                                <TiShoppingCart size={30}/> 
                                <button className='absolute -top-2 -right-2 text-xs text-white bg-red-500 w-[18px] h-[20px] rounded-full'>0</button>
                            </div>

                            {/* Login */}
                            {
                                user._id ? (
                                    <div className='relative group'>
                                        <p>Hello: <span className='font-semibold'>{user.name}</span></p>
                                        <ul className='absolute top-full right-0 z-40 bg-white shadow px-2 py-2.5 w-32 gap-2 text-sm hidden group-hover:block border border-gray-300 rounded-md'>
                                            <li onClick={() => navigate('/my-orders')} className='p-1.5 pl-3 cursor-pointer hover:text-indigo-500'>My Orders</li>
                                            <li onClick={handleLogout} className='p-1.5 pl-3 cursor-pointer hover:text-indigo-500'>Logout</li>
                                        </ul>
                                    </div>
                                ) : (
                                    <button onClick={() => {                          
                                        navigate('/login')
                                    }} 
                                        className='cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'>
                                        Login
                                    </button>
                                )
                            }
                        </div>

                        <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label='Menu' className='sm:hidden'>
                            {/* Menu icon */}
                            <MdMenu size={30}/>
                        </button>

                        {/* Mobile menu */}
                        {
                            open && (
                                <div className={`${open ? 'flex' : 'hidden'} absolute top-[100px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                                    {/* {
                                        navigation.map((nav, index) => {
                                            return (
                                                <div>
                                                    <NavLink key={nav.title} to={nav.href} onClick={() => setOpen(false)}
                                                        className={({ isActive })=>`px-2 font-bold hover:text-blue-800 ${isActive && 'text-blue-700'}`}>
                                                        {nav.title}
                                                    </NavLink>
                                                </div>
                                            )
                                        })
                                    } */}
                                    <NavLink to='/' onClick={() => setOpen(false)} className='px-2 font-bold hover:text-blue-800'>Home</NavLink>
                                    <NavLink to='/products' onClick={() => setOpen(false)} className='px-2 font-bold hover:text-blue-800'>Products</NavLink>
                                    <NavLink to='/news' onClick={() => setOpen(false)} className='px-2 font-bold hover:text-blue-800'>News</NavLink>
                                    <NavLink to='/contact' onClick={() => setOpen(false)} className='px-2 font-bold hover:text-blue-800'>Contact</NavLink>
                                    {
                                        user && 
                                        <NavLink to='/my-orders' onClick={() => setOpen(false)} className='px-2 font-bold hover:text-blue-800'>My Orders</NavLink>
                                    }

                                    {
                                        !user ? (
                                            <button onClick={() => {
                                                setOpen(false)
                                                setShowUserLogin(true)
                                                }} className='cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm'>
                                                Login
                                            </button>
                                        ) : (
                                            <button onClick={logout} className='cursor-pointer px-6 py-2 mt-2 bg-orange-500 hover:bg-orange-600 transition text-white rounded-full text-sm'>
                                                Logout
                                            </button>
                                        )
                                    }               
                                </div>
                            )
                        }
                    </>
                )
            }                       
        </nav>   
    )
}

export default Header
