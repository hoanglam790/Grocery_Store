import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { CgSpinner } from 'react-icons/cg'
import uploadNewImage from '../../utils/UploadNewImage'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'
import { showAlert, showErrorAlert } from '../../utils/AlertUtils'
import { MdCloudUpload } from 'react-icons/md'
import { useSelector } from 'react-redux'
import Loading from './Loading'

const UploadProduct = ({ close, fetchProductsData }) => {
    const [productData, setProductData] = useState({
        name: '',
        image: [],
        description: '',
        price: '',
        discount: '',
        category: '',
        rating: '',
        stock: [],
        isDisplayed: true
    })
    const [isLoading, setLoading] = useState(false)
    const [isImageLoading, setIsImageLoading] = useState(false)
    const [viewFullImage, setViewFullImage] = useState('')
    const [selectCategory, setSelectCategory] = useState('')

    const changeColorValue = Object.values(productData).every((e) => e !== '')
    const allCategories = useSelector((state) => state?.product_data?.categories)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductData((prev) => {
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
            const imageUrl = responseImage.data.data.url

            setIsImageLoading(false)

            setProductData((prev) => {
                return {
                    ...prev,
                    image: [...prev.image, imageUrl]
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsImageLoading(false)
        }      
    }

    // Handle delete image
    const handleDeleteImage = async(index) => {
        productData.image.splice(index, 1)
        setProductData((prev) => {
            return {
                ...prev
            }
        })
    }

    const handleSelectCategory = (e) => {
        const { value } = e.target
        const category = allCategories.find(e => e._id === value)
        setProductData((prev) => {
            return {
                ...prev,
                category: category
            }
        })
        setSelectCategory(value)
    }

    // Handle remove category
    const handleRemoveCategorySelected = () => {
        setProductData((prev) => {
            return {
                ...prev,
                category: ''
            }
        })
        setSelectCategory('')
    }

    const handleSubmitCreateProduct = async(e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const responseData = await Axios({
                ...ConnectApi.createProduct,
                data: productData
            })
            await showAlert(responseData, {
                onSuccess: () => {
                    close()
                    fetchProductsData()
                }
            })
        } catch (error) {
            await showErrorAlert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/70'>
            <div className='bg-white max-w-4xl w-full p-5 rounded-md'>
                <div className='relative text-center'>
                    <h2 className='font-semibold uppercase'>Upload New Product</h2>
                    <button onClick={close} className='absolute top-0.5 right-0 -translate-y-1/2 my-2.5 cursor-pointer'>
                        <IoMdClose size={25} />
                    </button>
                </div>

                <hr className='my-4 border-gray-300 -mx-5'/>

                <form onSubmit={handleSubmitCreateProduct}>
                    <div className='grid pt-4 pb-2 mx-2'>
                        <label className='py-2 font-semibold text-base'>Product Name:</label>
                        <input 
                            type='text'
                            id='name'
                            placeholder='Enter product name here...'
                            value={productData.name}
                            name='name'
                            onChange={handleInputChange}
                            required
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />
                    </div>

                    <div className='grid py-1 mx-2'>
                        <label className='py-2 font-semibold text-base'>Description:</label>
                        <textarea 
                            type='text'
                            id='description'
                            placeholder='Enter product description here...'
                            value={productData.description}
                            name='description'
                            onChange={handleInputChange}
                            rows={4}
                            required
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />
                    </div>

                    <div className='grid py-1 mx-2'>
                        <p className='py-2 font-semibold text-base'>Product Image:</p>
                        <div>
                            {/** Upload image */}
                            <label htmlFor='productImage' className='bg-neutral-200 h-28 border rounded-md flex items-center justify-center'>
                                <div className='flex justify-center items-center text-center flex-col'>
                                {
                                    isImageLoading ? <Loading /> : (
                                        <>
                                            <MdCloudUpload size={40}/>
                                            <p>Upload Image</p>
                                        </>
                                    )
                                }
                                    
                                </div>
                                <input 
                                    type='file'
                                    id='productImage'
                                    className='hidden'
                                    accept='image/*'
                                    onChange={handleUploadImage}
                                />
                            </label>

                            {/** Show image */}
                            <div className='flex flex-wrap gap-4'>
                            {   
                                productData.image.map((img, index) => {
                                    return(
                                        <div key={img + index} className='w-20 h-20 min-w-20 mt-2 bg-blue-50 border '>
                                            <div onClick={() => handleDeleteImage(index)} className='w-fit block ml-auto'>
                                                <IoMdClose />
                                            </div>
                                            <img 
                                                src={img} 
                                                alt={img}
                                                onClick={() => setViewFullImage(img)}
                                                className='w-[150px] h-[50px] object-scale-down'
                                            />                                       
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>                    
                    </div>

                    <div className='grid py-1 mx-2'>
                        <label className='py-2 font-semibold text-base'>Category:</label>
                        <div className='border focus-within:border-orange-400 rounded'>
                            <select 
                                value={selectCategory} 
                                className='w-full bg-transparent p-3 outline-none'
                                onChange={handleSelectCategory}
                            >                           
                                <option value={''} >--- Select Category ---</option>
                                {
                                    allCategories.map((c, index) => {
                                        return(
                                            <option value={c?._id}>
                                                {c?.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='flex flex-wrap gap-1'>
                            {
                                productData.category && (
                                    <div className='flex flex-wrap gap-1'>
                                        <p
                                            key={productData.category._id}
                                            className='bg-transparent border border-orange-400 p-2 m-1 flex items-center gap-2 rounded-sm'
                                        >
                                            {productData.category.name}
                                            <div
                                                className='hover:text-green-600 cursor-pointer'
                                                onClick={() => handleRemoveCategorySelected()}
                                            >
                                                <IoMdClose size={20} />
                                            </div>
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div className='grid py-1 mx-2'>
                        <label className='py-2 font-semibold text-base'>Price:</label>
                        <input 
                            type='number'
                            id='price'
                            placeholder='Enter product price here...'
                            value={productData.price}
                            name='price'
                            onChange={handleInputChange}
                            required
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />
                    </div>

                    <div className='grid py-1 mx-2'>
                        <label className='py-2 font-semibold text-base'>Discount:</label>
                        <input 
                            type='number'
                            id='discount'
                            placeholder='Enter product discount here...'
                            value={productData.discount}
                            name='discount'
                            onChange={handleInputChange}
                            required
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />
                    </div>

                    <div className='grid py-1 mx-2'>
                        <label className='py-2 font-semibold text-base'>Stock:</label>
                        <input 
                            type='number'
                            id='stock'
                            placeholder='Enter product stock here...'
                            value={productData.stock}
                            name='stock'
                            onChange={handleInputChange}
                            required
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default UploadProduct
