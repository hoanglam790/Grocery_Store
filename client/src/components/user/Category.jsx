import React from 'react'
import { assets, categories } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Category = () => {
    const { navigate } = useAppContext()

    return (
        <section>
            <div className='mt-12'>
                <div className='title mb-8 text-center'>
                    <p className='text-4xl font-extrabold text-gray-800 inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-blue-800 after:rounded-full'>                  
                    Categories
                    </p>   
                </div>
                <div className='bg-white px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-5 mt-14 rounded-lg'>
                    {
                        categories.map((category, index) => {
                            return(
                                <div onClick={() => {
                                    navigate(`/products/${category.path.toLowerCase()}`)
                                    window.scrollTo(0, 0)
                                }} 
                                key={index} className='flex flex-col items-center justify-center px-5 py-4 border rounded cursor-pointer transition-all'>                       
                                    <img src={category.image} className="w-48 h-36" />
                                    <button className='w-full text-sm outline-none bg-transparent hover:bg-purple-700 text-black hover:text-white transition-all duration-300 mt-5 p-1.5 rounded-lg cursor-pointer'>
                                        {category.text}
                                    </button>
                                </div>
                            )
                        })
                    }                  
                </div>
            </div>
        </section>
    )
}

export default Category
