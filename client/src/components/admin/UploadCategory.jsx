import React, { useState } from 'react'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { CgSpinner } from 'react-icons/cg'
import uploadNewImage from '../../utils/UploadNewImage'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'
import { showAlert, showErrorAlert } from '../../utils/AlertUtils'

const UploadCategory = ({ back, fetchCategoriesData }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isImageLoading, setIsImageLoading] = useState(false)
    const [categoryData, setCategoryData] = useState({
        name: '',
        image: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCategoryData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const changeColorValue = Object.values(categoryData).every((e) => e !== '')

    // Handle upload image
    const handleUploadImage = async(e) => {
        const file = e.target.files[0]

        if(!file){
            return
        }

        setIsImageLoading(true)
        try {
            const responseImage = await uploadNewImage(file)
            //const { data: responseNewImage } = responseImage
            setIsImageLoading(false)

            setCategoryData((prev) => {
                return {
                    ...prev,
                    image: responseImage.data.data.url
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsImageLoading(false)
        }      
    }

    // Handle submit
    const handleSubmitCreateCategory = async(e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...ConnectApi.createCategory,
                data: categoryData
            })
            
            await showAlert(responseData, {
                onSuccess: () => {
                    back()
                    fetchCategoriesData()
                }
            })
        } catch (error) {
            await showErrorAlert(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section>
            <div className='bg-white flex items-center justify-between w-full mt-2'>
                <button onClick={back} className='text-left ml-2 cursor-pointer'>
                    <HiArrowNarrowLeft size={25} />
                </button>
                <h2 className='font-semibold text-center flex-1'>Create New Category</h2>
            </div>

            <div className='py-2 flex flex-col justify-between bg-white'>
                <form onSubmit={handleSubmitCreateCategory} className='md:p-10 p-4 space-y-5 max-w-lg'>
                    <div className='flex flex-col gap-1 max-w-md'>
                        <label className='text-base font-medium' htmlFor='categoryName'>Category Name:</label>
                        <input className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40' 
                            type='text' 
                            name='name' 
                            id='name'
                            value={categoryData.name}
                            onChange={handleInputChange}
                            placeholder='Enter category name here'
                            required
                        />
                    </div>
                    <div className='py-2 flex flex-col justify-between bg-white'>
                        <p className='text-base font-medium'>Product Image:</p>
                        <div className='flex flex-col gap-4 lg:flex-row items-center'>
                            <div className='border border-blue-200 h-40 w-full lg:w-40 flex items-center justify-center rounded'>
                                {
                                    categoryData.image ? (
                                        <img
                                            alt='category'
                                            src={categoryData.image}
                                            className='w-full h-full object-scale-down'                                        
                                        />
                                    ) : (
                                        <p className='text-sm font-semibold'>No Image Found</p>
                                    )
                                }
                                
                            </div>

                            <label htmlFor='uploadCateImg'>
                                <div className={`${!categoryData.name ? 'cursor-not-allowed' : 'cursor-pointer'} rounded px-3 py-2`}>
                                    {
                                        isLoading ? (
                                            <div className='w-[110px] h-[42px] flex items-center justify-center'>
                                                <CgSpinner size={30} className='animate-[spin_0.8s_linear_infinite]' />
                                            </div>
                                        ) : (
                                            <div>
                                                <div className='flex flex-wrap items-center gap-3 mt-2'>
                                                    {Array(1).fill('').map((_, index) => (
                                                        <label key={index} htmlFor={`image${index}`}>
                                                            <input 
                                                                accept='image/*' 
                                                                type='file' 
                                                                id={`image${index}`} 
                                                                hidden 
                                                                disabled={!categoryData.name}
                                                                onChange={handleUploadImage}
                                                            />
                                                            <img 
                                                                className={`max-w-24 ${
                                                                    !categoryData.name ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                                                }`} 
                                                                src='https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png' alt='uploadArea' width={100} height={100} />
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                        )
                                    }                              
                                </div>
                                <input 
                                    type='file' 
                                    id='uploadCateImg' 
                                    className='hidden'
                                    disabled={!categoryData.name}
                                    onChange={handleUploadImage}
                                />
                            </label>                         
                        </div>
                    </div>

                    {
                        isLoading ? (
                            <div className='flex items-center justify-center'>
                                <button className='w-[150px] flex items-center justify-center gap-4 mt-4 px-5 py-3.5 text-sm tracking-wide text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none'>
                                    <CgSpinner size={25} className='animate-[spin_0.8s_linear_infinite]' />
                                </button>
                            </div>
                        ) : (
                            <div className='flex items-start'>
                                <button disabled={!changeColorValue} className={`${categoryData.name && categoryData.image ? 'w-[150px] flex items-center justify-center gap-4 mt-4 px-5 py-3.5 text-sm tracking-wide text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none cursor-pointer'
                                    : 'w-[150px] flex items-center justify-center gap-4 px-5 py-3.5 mt-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none cursor-not-allowed'}`}>
                                    Add
                                </button>
                            </div>
                        )
                    }
                </form>
            </div>           
        </section>
    )
}

export default UploadCategory
