import { useSelector } from 'react-redux';
import { selectDarkMode } from '../features/homeSlice';
import { Link } from 'react-router-dom';
import manSmileLight from "../assets/mansmillingwhite.png"
const Hero = () => {
  return (
    <div className='flex flex-col-reverse lg:flex-row gap-2 px-6 md:px-16 lg:px-36'>
        <div className='lg:w-1/2 w-full'>
            <h1 className='font-bold hero-text  md:mt-16 mt-4 lg:mt-24'>Let's Elevate Your Financial Journey to Greater Heights!</h1>
            <p className='text-base lg:text-2xl mt-2 md:font-semibold'>Welcome to DRAG, your all-in-one solution for effortless financial management with empowered savings.</p>
            <div className='flex text-lg md:text-2xl items-center gap-4 mt-8 md:font-semibold'>
                <Link to="/signup">
                    <h2 className='border-2 py-2 px-4 md:py-4 md:px-8 rounded-full border-gray-200 bg-gray-200 hover:bg-black hover:border-black hover:text-white text-black'>Get Started</h2>
                </Link>
                <h2 className='text-xl'>See how it works</h2>
            </div>
            <div className="flex mt-8 items-center gap-4">
                <div>
                    <h2 className='text-6xl'>70k</h2>
                    <p className='text-gray-600 text-2xl'>Customers</p>
                </div>
                <h2 className='text-6xl text-gray-300 font-light'>|</h2>
                <div>
                    <h2 className='text-6xl'>99%</h2>
                    <p className='text-gray-600 text-2xl'>Satisfaction</p>
                </div>
            </div>
        </div>
        <img src={manSmileLight} className='w-full lg:w-1/2 h-1/2 lg:h-full lg:mt-24 md:mt-16 mt-12' alt="" />
    </div>
  )
}

export default Hero