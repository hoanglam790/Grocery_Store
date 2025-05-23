import React from 'react'
import Banner from '../../components/user/Banner'
import Category from '../../components/user/Category'
import BestSeller from '../../components/user/BestSeller'

const Home = () => {
  return (
    <div className='container mx-auto p-3'>
        {/* Banner */}
        <div className=''>
          <Banner />
        </div>

        {/* Category */}
        <div className='py-1'>
          <Category />
        </div>

        {/* Best Sellers */}
        <div className='py-1'>
          <BestSeller />
        </div>
      </div>
  )
}

export default Home
