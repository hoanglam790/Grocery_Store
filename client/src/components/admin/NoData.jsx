import React from 'react'
import { assets } from '../../assets/assets'

const NoData = () => {
    return (
        <div className='py-28 flex flex-col items-center justify-center'>
            <img className='w-80' 
                src={assets.no_data} 
                alt='no_data' 
            />
            <p className='text-2xl font-semibold'>No Data Found</p>
        </div>
    )
}

export default NoData
