import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Home from '../pages/Home/Home'
import FundMyWallet from '../pages/FundMyWallet'
import Profile from '../pages/Profile'

const Navbar = () => {
    const [isClose, setIsClose] = useState(false)
  return (
    <header className='relative flex flex-row items-center justify-between h-10 px-16 lg:px-48 bg-greenAccent'>
        <NavLink to='/' className='text-2xl font-bold'>DRAG</NavLink>
        <nav className='hidden lg:pr-4 md:block'>
            <NavLink to='/' className={({isActive})=> isActive ? "font-bold text-gray-900 mx-2 mr-8" : 'bg hover:border-b-2 hover:border-black mx-2 mr-8'}>Home</NavLink>
            <NavLink to='/FundMyWallet' className={({isActive})=> isActive ? "font-bold text-gray-900 mx-2 mr-8" : 'bg hover:border-b-2 hover:border-black mx-2 mr-8'}>FundMyWallet</NavLink>
            <NavLink to='/profile' className={({isActive})=> isActive ? "font-bold text-gray-900 mx-2 mr-8" : 'bg hover:border-b-2 hover:border-black mx-2 mr-8'}>Profile</NavLink>
            <NavLink to='/notifications' className={({isActive})=> isActive ? "font-bold text-gray-900 mx-2 mr-8" : 'bg hover:border-b-2 hover:border-black mx-2 mr-8'}>Notifications</NavLink>
        </nav>
        {!isClose && <h1 onClick={()=>{setIsClose(!isClose)}} className='md:hidden'>M</h1>}
        {isClose && <div className='absolute -right-2 mr-8 top-0 md:hidden z-40'>
            <nav className='flex flex-col bg-white py-6 px-8 rounded-xl'>
            {<h1 className='cursor-pointer ml-auto mb-4' onClick={()=>{setIsClose(!isClose)}}>X</h1>}
                <NavLink to='/' onClick={()=>{setIsClose(!isClose)}} className={({isActive})=> isActive ? "font-bold text-gray-900 px-2 my-2" : 'bg hover:border-b-2 lg:pr-4 hover:border-black px-2 my-2'}>Home</NavLink>
                <NavLink to='/FundMyWallet' onClick={()=>{setIsClose(!isClose)}} className={({isActive})=> isActive ? "font-bold text-gray-900 px-2 my-2" : 'bg hover:border-b-2 lg:pr-4  hover:border-black px-2'}>FundMyWallet</NavLink>
                <NavLink to='/profile' onClick={()=>{setIsClose(!isClose)}} className={({isActive})=> isActive ? "font-bold text-gray-900 px-2 my-2" : 'bg hover:border-b-2  hover:border-black px-2  mt-2'}>Profile</NavLink>
                <NavLink to='/notifications' onClick={()=>{setIsClose(!isClose)}} className={({isActive})=> isActive ? "font-bold text-gray-900 px-2 my-2" : 'bg hover:border-b-2  hover:border-black px-2  my-2'}>Notifications</NavLink>
            </nav>
        </div>}
    </header>
      )
}

export default Navbar