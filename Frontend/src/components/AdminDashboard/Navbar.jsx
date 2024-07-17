import React from 'react'

function Navbar() {
  return (
    <div className='w-[100%]  flex justify-between px-2 py-1 border-b'>
      <div>
        <span className='font-bold text-3xl text-blue-500'>E-Store</span>
      </div>
      <div>
        <div className='flex items-center p-2 gap-2'>
            <div className='w-[30px] h-[30px] rounded-[50%] bg-blue-500 hover:bg-opacity-25'></div>
            <span>Admin</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
