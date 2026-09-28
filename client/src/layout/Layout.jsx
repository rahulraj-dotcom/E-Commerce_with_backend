import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className='h-screen w-screen bg-black text-white'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout