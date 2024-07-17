import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
function MainAdminContainer() {
  return (
    <div className='bg-white w-full min-h-screen'>
        <Navbar />
        <div className=' grid grid-col-1 min-[900px]:grid-cols-[20%_auto]'>
                <div className='  hidden min-[900px]:block h-[92vh]'>
                    <Sidebar />
                </div>
                <div className='bg-slate-100 overflow-y-auto'>
                    <Outlet />
                </div>
                
            </div>
      
    </div>
  )
}

export default MainAdminContainer
