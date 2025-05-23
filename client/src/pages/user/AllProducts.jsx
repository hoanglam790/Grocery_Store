import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/user/ProductCard'
import { useAppContext } from '../../context/AppContext'

const AllProducts = () => {
    return (
        <section className='mt-48'>
            <div className='container mx-auto flex flex-col'>
                <div className='flex flex-col items-center w-max'>
                    <p className='text-3xl font-bold text-gray-800 uppercase'>All Products</p>
                    <div className='w-16 h-0.5 bg-green-700 rounded-full mt-2'></div>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-10'>
                    <ProductCard />
                </div>
            </div>
        </section>
    )
}

export default AllProducts
