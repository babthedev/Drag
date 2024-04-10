import React from 'react'

const Pricing = () => {
  return (
    <div className=' px-6 md:px-16 lg:px-36 mt-16 '>
        <h1 className='text-6xl text-center'>
        Pricing
        </h1>
        <div className='flex flex-col md:flex-row justify-center items-center gap-4 mt-8'>
            <div className='w-full md:w-1/3 p-4 border border-gray-300 rounded-lg'>
                <h3 className='text-center text-5xl font-bold'>Free</h3>
                <p className='text-2xl'>DRAG is free for your 10 first Saving Targets</p>
                <p className='text-2xl'>We like to keep it simple and give you access to everything for you to test out.</p>
            </div>
            <div className='w-full md:w-2/3 p-4 border border-gray-300 rounded-lg'>
                <h3 className='text-center text-5xl font-bold'>Paid</h3>
                <p className='text-center text-2xl mt-2'>You have two options for the paid plan</p>
                <div className='flex flex-col md:flex-row justify-center items-center gap-4 mt-4'>
                    <div className='p-4 border border-gray-300 rounded-lg'>
                        <h3 className='text-center text-4xl'>Pro</h3>
                        <p className='text-2xl'>$5 per month to get access to all features.</p> 
                    </div>
                    <div className='p-4 border border-gray-300 rounded-lg'>
                        <h3 className='text-center text-4xl'>PAYU</h3>
                        <p className='text-2xl'>A fee of 10% on every saving target you make with DRAG</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pricing