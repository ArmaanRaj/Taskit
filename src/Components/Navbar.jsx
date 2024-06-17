import React from 'react'

const Navbar = () => {
  return (
      <nav className='flex justify-between bg-cyan-500 text-white py-4 rounded-lg'>
        <div className="logo hover:animate-bounce m-auto">
            <span  className='font-bold text-xl mx-7 cursor-pointer'>Taskit!</span>
        </div>
    </nav>
  )
}

export default Navbar
