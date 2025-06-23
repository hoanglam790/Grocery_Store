import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { CgSpinner } from 'react-icons/cg'
import uploadNewImage from '../../utils/UploadNewImage'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'
import { showAlert, showErrorAlert } from '../../utils/AlertUtils'

const UpdateCategory = ({ close, fetchCategoriesData, data: cateData }) => {
    const [categoryData, setCategoryData] = useState({
        id: cateData._id,
        name: cateData.name,
        image: cateData.image
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isImageLoading, setIsImageLoading] = useState(false)

    // Handle change value in toggle
    const changeColorValue = Object.values(categoryData).every((e) => e !== '')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCategoryData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

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

    const handleDeleteImage = () => {
        setCategoryData((prev) => {
            return {
                ...prev,
                image: ''
            }
        })
    }
    const handleSubmitUpdateCategory = async(e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...ConnectApi.updateCategory,
                data: categoryData
            })
            
            await showAlert(responseData, {
                onSuccess: () => {
                    close()
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
        <section className='fixed inset-0 bg-neutral-800/70 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-[600px] p-5 rounded-md'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold uppercase'>Update Category</h2>
                    <button onClick={close} className='w-fit block ml-auto cursor-pointer'>
                        <IoMdClose size={25} />
                    </button>
                </div>

                <form onSubmit={handleSubmitUpdateCategory}>
                    <div className='grid py-4'>
                        <label className='py-2 font-semibold'>Name:</label>
                        <input 
                            type='text'
                            id='name'
                            placeholder='Please enter category name'
                            value={categoryData.name}
                            name='name'
                            onChange={handleInputChange}
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />
                    </div>

                    <div className='grid gap-1 py-1'>
                        <label id='categoryImage' className='py-1 font-semibold'>Image:</label>
                        <div className='flex flex-col gap-4 lg:flex-row items-center justify-center'>
                            <div className='border border-blue-200 h-40 w-full lg:w-40 flex items-center justify-center rounded relative'>                       
                                {
                                    categoryData.image ? (
                                        <>
                                            <img
                                                alt='category'
                                                src={categoryData.image}
                                                className='w-full h-full object-scale-down'                                        
                                            />
                                            <button onClick={handleDeleteImage} className='absolute top-1 right-0 h-6 w-6 block ml-auto cursor-pointer'>
                                                <IoMdClose size={20} />
                                            </button>
                                        </>                                       
                                    ) : (
                                        <p className='text-sm font-semibold'>No image found</p>
                                    )
                                }                               
                            </div>

                            <label htmlFor='uploadCateImg'>
                                <div className={`${!categoryData.name ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-400 cursor-pointer'} rounded px-3 py-2`}>
                                {
                                    isLoading ? (
                                        <div className='w-[110px] h-[42px] flex items-center justify-center'>
                                            <CgSpinner size={30} className='animate-[spin_0.8s_linear_infinite]' />
                                        </div>
                                    ) : (
                                        <div className='px-3 py-2'>
                                            <p>Upload Image</p>
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
                        {
                            isLoading ? (
                                <div className='flex items-center justify-center'>
                                    <button className='w-[150px] flex items-center justify-center gap-4 mt-4 px-5 py-3.5 text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none'>
                                        <CgSpinner size={25} className='animate-[spin_0.8s_linear_infinite]'/>
                                    </button>
                                </div>                               
                            ) : (
                                <div className='flex items-center justify-center'>
                                    <button disabled={!changeColorValue} className={`${categoryData.name && categoryData.name ? 'w-[150px] flex items-center justify-center gap-4 mt-4 px-5 py-3.5 text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 hover:text-black rounded-md focus:outline-none cursor-pointer'
                                        : 'w-[150px] flex items-center justify-center gap-4 px-5 py-3.5 mt-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none cursor-not-allowed'}`}>
                                        Update
                                    </button>
                                </div>                               
                            )
                        }                      
                    </div>
                </form>
            </div>
        </section>
    )
}

export default UpdateCategory
