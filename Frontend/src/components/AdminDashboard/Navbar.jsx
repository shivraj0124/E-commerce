import React from 'react'

function Navbar() {
  return (
    <div className='w-[100%]  flex justify-end px-2 py-1  sticky top-0'>

        <div className='flex justify-end items-center p-2 gap-2'>
            <div className='w-[30px] h-[30px] rounded-[50%] bg-blue-500 hover:bg-opacity-25'></div>
            <span className='text-black'>Admin</span>
        </div>
    </div>
  )
}

export default Navbar
