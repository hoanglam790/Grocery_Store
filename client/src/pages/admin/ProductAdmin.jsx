import React, { use, useEffect, useState } from 'react'
import { GrSearch } from 'react-icons/gr'
import { MdAdd, MdDelete } from 'react-icons/md'
import NoData from '../../components/admin/NoData'
import { FaRegEdit } from 'react-icons/fa'
import { IoEye } from 'react-icons/io5'
import moment from 'moment'
import UploadProduct from '../../components/admin/UploadProduct'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'
import { showAlert, showErrorAlert } from '../../utils/AlertUtils'
import Pagination from '../../components/Pagination'
import Swal from 'sweetalert2'
//import UpdateProduct from '../../components/admin/UpdateProduct'
import ViewImage from '../../components/admin/ViewImage'

const ProductAdmin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [productData, setProductData] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPageCount, setTotalPageCount] = useState(1)
    const [limit, setLimit] = useState(6)
    const [viewFullImage, setViewFullImage] = useState('')
    const [openUploadProduct, setOpenUploadProduct] = useState(false)

    // Handle search
    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value) // Set search value
        setPage(1) // Reset page when search change
    }

    // Fetch products
    const fetchProductData = async() => {
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...ConnectApi.getAllProducts,
                data: {
                    page: page,
                    limit: limit,
                    search: search
                }
            })

            // Check if fetch products is successful
            await showAlert(responseData, {
                onSuccess: () => {
                    setTotalPageCount(responseData?.data?.totalNumberPage)
                    setProductData(responseData?.data?.data)
                },
                showSuccess: false
            })
        } catch (error) {
            showErrorAlert(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        let flag = true
        const interval = setInterval(() => {
            if(flag) {
                fetchProductData()
                flag = false
            }
        }, 1000) // Delay 1s before fetch products data
        return () => {
            clearInterval(interval)
        }
    }, [page, search])

    return (
        <section>
            <div className='bg-slate-100 shadow-lg flex items-center justify-between p-2 ml-1'>
                <h2 className='font-semibold'>List of Products</h2>
                <div className='min-w-[220px] lg:min-w-[330px] h-10 rounded-md border border-gray-400 overflow-hidden focus-within:border-blue-700'>
                    <button className='flex items-center justify-between ml-auto w-full h-full p-2 text-neutral-500'>
                        <input type='text'
                            placeholder='Search by name...'
                            value={search}
                            onChange={handleSearch}
                            className='w-full h-full bg-transparent outline-none'
                        />
                        <GrSearch className='fill-gray-600'/>
                    </button>                       
                </div>
                <button onClick={() => setOpenUploadProduct(true)} className='text-base border border-green-500 hover:bg-green-600 hover:text-white px-2 py-1 rounded flex items-center gap-1 cursor-pointer'>
                    <MdAdd size={20} />
                    Create
                </button>
            </div>

            {
                productData?.[0] && !isLoading ? (
                    <NoData />
                ) : (
                    <div className='bg-white pb-4'>
                        <div className='min-h-[65vh]'>
                            <table className='w-full userTable'>
                                <thead>
                                    <tr className='bg-gray-500 text-white'>
                                        <th className='w-14'>No.</th>
                                        <th className='w-60'>Name</th>
                                        <th className='w-32'>Image</th>
                                        <th className='w-60'>Description</th>
                                        <th className='w-40'>Price</th>
                                        <th className='w-28'>Display</th>
                                        <th className='w-40'>Created At</th>
                                        <th className='p-2'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Product data 
                                        productData?.map((product, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='text-sm'>{index + 1}</td>
                                                    <td className='text-sm'>{product.name}</td>
                                                    <td className='text-sm'>{product.image}</td>
                                                    <td className='text-sm'>{product.description}</td>
                                                    <td className='text-sm'>{product.price}</td>
                                                    <td className='text-sm'>{product.display ? 'Yes' : 'No'}</td>
                                                    <td className='text-sm'>Action</td>
                                                </tr>
                                            )
                                        })
                                    */}
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <div className='flex items-center justify-center gap-2'>
                                            <button
                                                className='bg-orange-600 rounded p-1.5 hover:bg-orange-700 hover:text-white cursor-pointer'
                                                title='Edit'>
                                                <IoEye size={20}/>
                                            </button>
                                            <button
                                                className='bg-blue-600 rounded p-1.5 hover:bg-blue-700 hover:text-white cursor-pointer'
                                                title='Edit'>
                                                <FaRegEdit size={20}/>
                                            </button>
                                            <button
                                                className='bg-red-600 rounded p-1.5 hover:bg-red-700 hover:text-white cursor-pointer'
                                                title='Delete'>
                                                <MdDelete size={20}/>
                                            </button>
                                        </div>
                                    </td>                                  
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className='mt-3 flex items-center justify-center'>
                            <Pagination 
                                currentPage={page}
                                totalPages={totalPageCount}
                                onPageChange={setPage}
                            />
                        </div>
                    </div>
                )
            }

            {
                openUploadProduct && (
                    <UploadProduct fetchProductsData={fetchProductData} close={() => setOpenUploadProduct(false)}/>
                )
            }
        </section>
    )
}

export default ProductAdmin
