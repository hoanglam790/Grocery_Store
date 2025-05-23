import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../../context/AppContext'

const BestSeller = () => {
    const { product } = useAppContext()

    return (
        <section>
            <div className='mt-12'>
                <div className='title mb-8 text-center'>
                    <p className='text-4xl font-extrabold text-gray-800 inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-green-700 after:rounded-full'>                  
                    Best Sellers
                    </p>   
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-12'>
                    <ProductCard product={product[0]}/>
                </div>
            </div>
        </section>
    )
}

export default BestSeller
