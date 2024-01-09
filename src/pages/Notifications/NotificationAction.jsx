import React from 'react'

const NotificationAction = ({toggleAdd, setToggleAdd}) => {
  return (
    <div className='z-notification bg-gray-400 bg-opacity-75 absolute overflow-hidden h-screen w-screen -top-20 -left-0'>
        <h2 className='text-3xl float-right mr-16 mt-16 cursor-pointer' onClick={() => setToggleAdd(!toggleAdd)}>X</h2>
        <div className='lg:w-2/5 mx-auto w-4/5 bg mt-48 bg-white rounded-2xl p-10 z-50'>
            <h2 className='text-2xl'>Refridgerator</h2>
            <h2 className='text-2xl text-gray-500'>#50,000</h2>
            <form action="#" className='flex flex-col mt-4'>
                <label htmlFor="merchantID">Merchant ID</label>
                <input 
                    type="text"
                    id='merchantID'
                    className='bg-slightDark text-gray-800 px-2 border-gray-200 rounded-md h-8'
                />
                <button className='w-full mx-auto my-2 text-lg text-center bg-slightDark py-1 rounded-lg cursor-pointer mt-6'>Transfer Saving Amount</button>
            </form>
        </div>
    </div>
  )
}

export default NotificationAction