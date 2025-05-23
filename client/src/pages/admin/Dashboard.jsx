import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminContextProvider } from '../../context/AdminContext'
import HeaderAdmin from '../../components/admin/HeaderAdmin'
import SidebarAdmin from '../../components/admin/SidebarAdmin'
import FooterAdmin from '../../components/admin/FooterAdmin'

const Dashboard = () => {
    return (
        <>
            <AdminContextProvider>
                { /* Header */ }
                <HeaderAdmin />

                {/* Sidebar */}
                <div className='flex'>
                    { /* Content is shown on the left */ }
                    <SidebarAdmin />

                    { /* Content is shown on the right */ }
                    <div className='p-2 flex-1 bg-white min-h-[75vh]'>
                        <Outlet />
                    </div>
                </div>

                {/* Footer */}
                <FooterAdmin />          
            </AdminContextProvider>
        </>
    )
}

export default Dashboard
