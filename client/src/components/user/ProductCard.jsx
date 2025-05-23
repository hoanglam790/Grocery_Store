import React, { useState } from 'react'
import { TiShoppingCart } from 'react-icons/ti'
import { FaStar, FaRegStar } from 'react-icons/fa6'

const ProductCard = () => {
    const [count, setCount] = useState(0)
    const product = {
        name: 'Casual Shoes',
        category: 'Sports',
        price: 100,
        offerPrice: 80,
        rating: 4,
        image: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png',
        stock: 10
    }

    return (
        <div className='border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full'>
            <div className='group cursor-pointer flex items-center justify-center px-2'>
                <img className='group-hover:scale-105 transition max-w-26 md:max-w-36' src={product.image} alt={product.name} />
            </div>
            <div className='text-gray-500/60 text-sm'>
                <p>{product.category}</p>
                <p className='text-gray-700 font-medium text-lg truncate w-full'>{product.name}</p>
                
                {/* Rating */}
                <div className='flex items-center gap-0.5'>
                    {Array(5).fill('').map((_, i) => (
                        product.rating > i ? (
                            <FaStar size={14}/>
                        ) : (
                            <FaRegStar size={14}/>
                        )
                    ))}
                    <p>({product.rating})</p>
                </div>

                {/* Price */}
                <div className='flex items-end justify-between mt-3'>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        <div className='flex items-center gap-2'>
                            <p className='text-xl md:text-xl text-green-500'>
                                ${product.offerPrice}
                            </p>
                            <span className='text-gray-500/60 md:text-sm text-sm line-through'>${product.price}</span>
                        </div>
                    </div>
                    
                    <div className='text-indigo-500'>
                        {count === 0 ? (
                            <button className='flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-200 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium' onClick={() => setCount(1)} >
                                <TiShoppingCart size={18} />
                                Add
                            </button>
                        ) : (
                            <div className='flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none'>
                                <button onClick={() => setCount((prev) => Math.max(prev - 1, 0))} className='cursor-pointer text-md px-2 h-full' >
                                    -
                                </button>
                                <span className='w-5 text-center'>{count}</span>
                                <button onClick={() => setCount((prev) => prev + 1)} className='cursor-pointer text-md px-2 h-full' >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
