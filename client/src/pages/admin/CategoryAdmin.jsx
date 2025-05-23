import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import NoData from '../../components/admin/NoData'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import UploadCategory from '../../components/admin/UploadCategory'
import Axios from '../../common/AxiosConfig'
import ConnectApi from '../../common/ApiBackend'
import { showAlert, showErrorAlert } from '../../utils/AlertUtils'
import moment from 'moment'
import Pagination from '../../components/Pagination'

const CategoryAdmin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [openUploadCate, setOpenUploadCate] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPageCount, setTotalPageCount] = useState(1)
    const [limit, setLimit] = useState(6)
    const [search, setSearch] = useState('')

    // Handle change value in toggle
    const handleChangeStatus = (e) => {
        const newStatus = e.target.checked ? true : false
        setCategoryData((prev) => ({
            ...prev,
            isDisplayed: newStatus
        }))
    }

    // Fetch categories
    const fetchCategoryData = async() => {
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...ConnectApi.getAllCategories,
                data: {
                    page: page,
                    limit: limit,
                    search: search
                }
            })

            // Check if fetch categories is successful
            showAlert(responseData, 
                () => {},
                (payload) => {
                    setTotalPageCount(payload?.totalNumberPage) // Total number of page
                    setCategoryData(payload?.data) // Set categories
                }
            )
        } catch (error) {
            showErrorAlert(error)
        } finally {
            setIsLoading(false)
        }
    }

    // Fetch categories data when page change or search change
    useEffect(() => {
        let flag = true 

        const interval = setTimeout(() => {
            if(flag){
                fetchCategoryData()
                flag = false
            }
        }, 300)

        return () => {
            clearTimeout(interval)
        }
    }, [page, search])
    //console.log('Current page: ', page, 'Total pages: ', totalPageCount)

    return (
        <section>
        {
            !openUploadCate && (
                <>
                    <div className='bg-slate-100 shadow-lg flex items-center justify-between p-2 ml-1'>
                        <h2 className='font-semibold'>All Categories</h2>
                        <button onClick={() => setOpenUploadCate(true)} className='text-base border border-green-500 hover:bg-green-600 px-2 py-1 rounded flex items-center gap-1 cursor-pointer'>
                            <MdAdd size={20} />
                            Create
                        </button>
                    </div>           
                    {
                        !categoryData?.[0] && !isLoading ? (
                            <NoData />
                        ) : (
                            <div className='bg-white pb-4'>
                                <div className='min-h-[65vh]'>
                                    <table className='userTable w-full'>
                                        <thead>
                                            <tr className='bg-gray-500 text-white'>
                                                <th className='w-14'>No.</th>
                                                <th className='w-[300px]'>Category Name</th>
                                                <th className='w-[230px]'>Image</th>
                                                <th className=''>Display</th>
                                                <th className=''>Created</th>
                                                <th className=''>Action</th>
                                            </tr>                        
                                        </thead>
                                        <tbody>
                                        {
                                            categoryData.map((category, index) => {
                                                return (
                                                    <tr key={category._id}>
                                                        <td>{(page - 1) * limit + index + 1}</td>
                                                        <td>{category?.name}</td>
                                                        <td>
                                                            <img 
                                                                alt={category.name}
                                                                src={category.image}
                                                                className='w-full h-10 mt-3 object-scale-down'
                                                            />
                                                        </td>
                                                        <td>
                                                            <label className='inline-flex items-center cursor-pointer'>
                                                                <input
                                                                    type='checkbox'
                                                                    className='sr-only peer'
                                                                    checked={category.isDisplayed}
                                                                    onChange={(e) => handleChangeStatus(category._id, e)}                                               
                                                                />
                                                                <div className='relative w-11 h-6 bg-gray-200 rounded-full dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600'></div>                                            
                                                            </label>
                                                        </td>
                                                        <td>{moment(category.createdAt).format('MM/DD/YYYY - HH:mm')}</td>
                                                        <td>
                                                            <div className='flex justify-center gap-2'>
                                                                <button 
                                                                    className='bg-blue-600 rounded p-1.5 hover:bg-blue-700 hover:text-white cursor-pointer'
                                                                    title='Edit'>
                                                                    <FaRegEdit size={20}/>
                                                                </button>
                                                                <button 
                                                                    className='bg-red-500 rounded p-1.5 hover:bg-red-700 hover:text-white cursor-pointer'
                                                                    title='Delete'>
                                                                    <MdDelete size={20}/>
                                                                </button>
                                                            </div>                                                                               
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }                                       
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
                </>
            )
        }
            
        {
            openUploadCate && (
                <UploadCategory fetchCategoriesData={fetchCategoryData} back={() => setOpenUploadCate(false)}/>
            )
        }
        </section>    
    )
}

export default CategoryAdmin
