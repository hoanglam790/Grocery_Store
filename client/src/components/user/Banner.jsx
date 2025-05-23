import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { assets } from '../../assets/assets'
import { IoMdClock } from 'react-icons/io'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const [currentTime, setCurrentTime] = useState(moment())

    // Images
    const bannerImages = [
        assets.banner_1, 
        assets.banner_2, 
        assets.banner_3
    ]

    // Handling the previous image
    const prevImage = () => {
        if(currentImage != 0){ // If the current image is not the first
            setCurrentImage(prev => prev - 1) // Go to the previous image
        }      
    }

    // Handling the next image
    const nextImage = () => {
        if(bannerImages.length - 1 > currentImage){ // If the current image is not the last
            setCurrentImage(prev => prev + 1) // Go to the next image
        }      
    }

    // Auto play the images
    useEffect(() => {
        const interval = setInterval(() => {
            if(bannerImages.length - 1 > currentImage){ // If the current image is not the last
                nextImage() // Go to the next image
            }
            else{
                setCurrentImage(0) // Go to the first image
            }
        }, 5000) // 5 seconds
        return () => clearInterval(interval) // Clear the interval
    }, [currentImage])

    // Auto play the time
    useEffect(() => {
        const interval = setInterval(() => { // Updating every second
            setCurrentTime(moment()) // Update the current time
        }, 1000) // 1 second
        return () => clearInterval(interval) // Clear the interval
    }, [])

    // Formatting the date
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const formattedDate = `${daysOfWeek[currentTime.day()]}, ${currentTime.format('LL - HH:mm:ss')}`

    return (
        <div className='w-full max-h-screen overflow-hidden relative rounded-lg pt-2'>
            <div className='flex justify-end mb-8'>
                <div className='flex items-center gap-2'>
                    <IoMdClock size={23}/>
                    <p className='font-semibold italic'>
                        {formattedDate}
                    </p>
                </div>              
            </div>
            <div className='absolute z-10 inset-0 flex items-center justify-between px-4'>
                <button 
                    onClick={prevImage} 
                    className='bg-white shadow-md rounded-full p-2 mt-12 hover:bg-transparent hover:text-white transition cursor-pointer'>
                    <FaAngleLeft size={25} />
                </button>
                <button 
                    onClick={nextImage} 
                    className='bg-white shadow-md rounded-full p-2 mt-12 hover:bg-transparent hover:text-white transition cursor-pointer'>
                    <FaAngleRight size={25} />
                </button>
            </div>

            <div className='flex'>
            {
                bannerImages.map((imageUrl, index) => {
                    return (
                    <>
                        <div key={imageUrl} 
                            style={{transform: `translateX(-${currentImage * 100}%)`}}
                            className='w-full h-[450px] min-w-full min-h-full transition-all'>
                            <img src={imageUrl} className='w-full h-[450px] object-cover'/>
                        </div>
                    </>                                              
                    )
                })
            }
            </div>           
        </div>
    )
}

export default Banner
