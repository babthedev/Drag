import React from 'react'
import manFlashingLight from "../assets/manflashingwhite.png"
import { Link } from 'react-router-dom';
const Alternables = () => {
  return (
    <div className='flex lg:flex-row px-6 md:px-16 lg:px-36 flex-col mt-16 justify-center items-center gap-4'>
        <img src={manFlashingLight} width="500px" className='' alt="" />
        <div className=''>
            <h2 className='text-6xl'>Join thousands of satisfied users.</h2>
            <p className='text-2xl'>Experience the convenience and confidence of DRAG. Sign up now and start your journey towards financial success today.</p>
            <Link to="/signup">
              <h2 className={`border-2 py-4 px-4 rounded-full mt-7 border-gray-200 bg-gray-200 hover:bg-black hover:border-black hover:text-white mx-8 mb-4 lg:mx-36 text-center text-2xl text-black`}>Get Started</h2>
            </Link>
        </div>
    </div>
  )
}

export default Alternables