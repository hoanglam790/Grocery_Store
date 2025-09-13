import React from 'react'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Generate the page range
    const createPageRange = () => {
        const delta = 1 // Number of pages to show on each side of the current page
        const range = [] // Array to store the page range
        const rangeWithDots = [] // Array to store the page range with dots
        let lastPage // Last page

        // Calculate the page range
        for(let i = 1; i <= totalPages; i++) {
            if(i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i) // Add the page to the range
            }
        }

        // Add dots to the page range
        for(let i of range) {
            if(lastPage){
                if(i - lastPage === 2) {
                    rangeWithDots.push(lastPage + 1)
                } else if(i - lastPage > 2) {
                    rangeWithDots.push('...')
                }
            }
            rangeWithDots.push(i)
            lastPage = i
        }
        return rangeWithDots
    }
    //console.log('Page range generated:', createPageRange())
    
    // Handle page click
    const handlePageClick = (page) => {
        if(typeof page === 'number' && page !== currentPage) {
            onPageChange(page)
        }
    }
    return (
        <div className='flex items-center justify-between w-full max-w-80 text-gray-500 font-medium'>
            {/* Previous page button */}
            {
                currentPage !== 1 && (
                    <button
                        aria-label='prev'
                        className='rounded-full bg-slate-200/50 cursor-pointer'
                        onClick={() => handlePageClick(currentPage - 1)}
                        >
                        <GrFormPrevious size={35} className='text-orange-500' />
                    </button>
                )
            }

            {/* Pages */}
            <div className='flex items-center gap-2 text-sm font-medium'>
                {createPageRange().map((page, index) => {
                    if(page === '...') {
                        return (
                            <span key={`dots-${index}`} className='px-2 select-none'>...</span>
                        )
                    }

                    const isActive = page === currentPage
                    return (
                        <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={`h-10 w-10 text-[18px] flex items-center justify-center aspect-square cursor-pointer
                                ${isActive 
                                    ? 'text-white bg-red-700 border rounded-full' 
                                    : 'hover:bg-slate-200 hover:rounded-full'
                                }`}
                            >
                            {page}
                        </button>
                    )
                })}
            </div>

            {/* Next page button */}
            {
                currentPage !== totalPages && (
                    <button
                        aria-label='next'
                        className='rounded-full bg-slate-200/50 cursor-pointer'
                        onClick={() => handlePageClick(currentPage + 1)}
                    >
                        <GrFormNext size={35} className='text-orange-500'/>
                    </button>
                )
            }
        </div>                              
    )
}

export default Pagination
